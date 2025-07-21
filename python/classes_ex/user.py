# Design a User class that validates username and email format using private methods.

import re

class User:
    def __init__(self, username, email):
        """
        Initialize a User with validated username and email.
        
        Args:
            username (str): The user's username
            email (str): The user's email address
            
        Raises:
            ValueError: If username or email doesn't meet requirements
        """
        self._username = None
        self._email = None
        self.username = username  # Uses setter with validation
        self.email = email        # Uses setter with validation
    
    # with this we can use the setter and getter methods
    @property
    def username(self):
        """Get the username"""
        return self._username
    
    # use when we want to run some check while setting the value
    @username.setter
    def username(self, value):
        """Set the username after validation"""
        if not self._is_valid_username(value):
            raise ValueError("Invalid username format")
        self._username = value
    
    @property
    def email(self):
        """Get the email"""
        return self._email
    
    @email.setter
    def email(self, value):
        """Set the email after validation"""
        if not self._is_valid_email(value):
            raise ValueError("Invalid email format")
        self._email = value
    
    def _is_valid_username(self, username):
        """
        Private method to validate username format.
        Rules:
        - 4-20 characters long
        - Only alphanumeric characters, underscores, and hyphens
        - Must start with a letter
        """
        if not isinstance(username, str):
            return False
        pattern = r'^[a-zA-Z][a-zA-Z0-9_-]{3,19}$'
        return bool(re.fullmatch(pattern, username))
    
    def _is_valid_email(self, email):
        """
        Private method to validate email format.
        Uses a simplified version of RFC 5322 standard.
        """
        if not isinstance(email, str):
            return False
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return bool(re.fullmatch(pattern, email))
    
    def __str__(self):
        """String representation of the User"""
        return f"User(username='{self.username}', email='{self.email}')"
    
    def __repr__(self):
        """Official string representation"""
        return f"User(username={repr(self.username)}, email={repr(self.email)})"


# Example usage
if __name__ == "__main__":
    try:
        # Valid user
        user1 = User("john_doe", "john@example.com")
        print(f"Created valid user: {user1}")
        
        # Another valid user
        user2 = User("jane-smith", "jane.smith@domain.co.uk")
        print(f"Created valid user: {user2}")
        
        # Invalid username (starts with number)
        try:
            user3 = User("1baduser", "test@example.com")
        except ValueError as e:
            print(f"\nFailed to create user: {e}")
        
        # Invalid email (missing @)
        try:
            user4 = User("gooduser", "bademail.com")
        except ValueError as e:
            print(f"Failed to create user: {e}")
        
        # Test property setters
        print("\nTesting property setters:")
        user1.username = "new_username"  # Valid change
        print(f"Changed username to: {user1.username}")
        
        try:
            user1.email = "invalid.email"  # Invalid change
        except ValueError as e:
            print(f"Couldn't change email: {e}")
            
    except Exception as e:
        print(f"Unexpected error: {e}")