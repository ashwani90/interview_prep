import bcrypt
import os
from typing import Tuple

class PasswordHasher:
    # Class-level pepper (same for all instances, typically loaded from environment)
    PEPPER = os.environ.get('PASSWORD_PEPPER', 'default-secret-pepper').encode()
    
    @staticmethod
    def hash_password(password: str) -> Tuple[bytes, bytes]:
        """
        Hash a password with bcrypt, salt, and pepper.
        
        Args:
            password: The plaintext password to hash
            
        Returns:
            Tuple of (hashed_password, salt)
        """
        # Generate a random salt
        salt = bcrypt.gensalt()
        
        # Combine password + pepper before hashing
        peppered_password = password.encode() + PasswordHasher.PEPPER
        
        # Hash with bcrypt
        hashed = bcrypt.hashpw(peppered_password, salt)
        
        return hashed, salt
    
    @staticmethod
    def verify_password(password: str, hashed: bytes, salt: bytes) -> bool:
        """
        Verify a password against its hash.
        
        Args:
            password: Plaintext password to verify
            hashed: Previously hashed password
            salt: Salt used in original hash
            
        Returns:
            bool: True if password matches, False otherwise
        """
        # Combine password + pepper
        peppered_password = password.encode() + PasswordHasher.PEPPER
        
        # Hash the input password and compare
        return bcrypt.checkpw(peppered_password, hashed)

# Example usage
if __name__ == "__main__":
    # Set pepper from environment (in real app, load from secure config)
    os.environ['PASSWORD_PEPPER'] = 'my-secret-pepper-value'
    
    # Example password
    password = "SecureP@ssw0rd123"
    
    # Hash the password
    hashed, salt = PasswordHasher.hash_password(password)
    print(f"Salt: {salt.decode()}")
    print(f"Hashed password: {hashed.decode()}")
    
    # Verify correct password
    is_valid = PasswordHasher.verify_password(password, hashed, salt)
    print(f"Password verification (correct): {is_valid}")
    
    # Verify incorrect password
    is_valid = PasswordHasher.verify_password("wrongpassword", hashed, salt)
    print(f"Password verification (incorrect): {is_valid}")