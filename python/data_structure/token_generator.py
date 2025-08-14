import secrets
import string
from typing import Optional

class SecureTokenGenerator:
    @staticmethod
    def generate_token(length: int = 32, 
                      include_digits: bool = True, 
                      include_punctuation: bool = False) -> str:
        """
        Generate a cryptographically secure random token.
        
        Args:
            length: Length of the token (default: 32)
            include_digits: Include digits (0-9) in token (default: True)
            include_punctuation: Include punctuation in token (default: False)
            
        Returns:
            Generated secure token string
        """
        # Define character set
        chars = string.ascii_letters
        if include_digits:
            chars += string.digits
        if include_punctuation:
            chars += string.punctuation
        
        # Validate we have characters to choose from
        if not chars:
            raise ValueError("No characters available for token generation")
        
        # Generate token using cryptographically secure random choices
        return ''.join(secrets.choice(chars) for _ in range(length))

    @staticmethod
    def generate_hex_token(byte_length: int = 16) -> str:
        """
        Generate a cryptographically secure hexadecimal token.
        
        Args:
            byte_length: Number of random bytes to use (default: 16)
            
        Returns:
            Hexadecimal string token
        """
        return secrets.token_hex(byte_length)

    @staticmethod
    def generate_urlsafe_token(byte_length: int = 16) -> str:
        """
        Generate a cryptographically secure URL-safe token.
        
        Args:
            byte_length: Number of random bytes to use (default: 16)
            
        Returns:
            URL-safe token string
        """
        return secrets.token_urlsafe(byte_length)

# Example usage
if __name__ == "__main__":
    # Generate different types of secure tokens
    print("Custom Token:", SecureTokenGenerator.generate_token(24))
    print("Hex Token:", SecureTokenGenerator.generate_hex_token())
    print("URL-safe Token:", SecureTokenGenerator.generate_urlsafe_token())
    
    # Generate token with specific requirements
    print("\nPassword Reset Token:", SecureTokenGenerator.generate_token(32, True, False))
    print("API Key:", SecureTokenGenerator.generate_token(64, True, True))
    print("Short Verification Code:", SecureTokenGenerator.generate_token(6, True, False))