from functools import wraps
from typing import List, Callable

# Define user roles
ROLES = {
    'ADMIN': 4,
    'EDITOR': 3,
    'AUTHOR': 2,
    'READER': 1,
    'GUEST': 0
}

# User database (simplified)
users = {
    'alice': {'role': 'ADMIN', 'password': 'alice123'},
    'bob': {'role': 'EDITOR', 'password': 'bob123'},
    'charlie': {'role': 'AUTHOR', 'password': 'charlie123'},
    'dave': {'role': 'READER', 'password': 'dave123'},
    'eve': {'role': 'GUEST', 'password': 'eve123'}
}

current_user = None

def login(username: str, password: str) -> bool:
    """Simulate user login"""
    global current_user
    if username in users and users[username]['password'] == password:
        current_user = username
        print(f"User {username} logged in as {users[username]['role']}")
        return True
    return False

def logout():
    """Simulate user logout"""
    global current_user
    if current_user:
        print(f"User {current_user} logged out")
    current_user = None

def has_permission(required_roles: List[str]):
    """
    Decorator to check if current user has required role
    
    Args:
        required_roles: List of roles that can access this function
    """
    def decorator(func: Callable):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if current_user is None:
                raise PermissionError("User not logged in")
            
            user_role = users[current_user]['role']
            user_level = ROLES[user_role]
            required_level = max(ROLES[role] for role in required_roles)
            
            if user_level >= required_level:
                return func(*args, **kwargs)
            else:
                raise PermissionError(
                    f"User {current_user} with role {user_role} "
                    f"cannot access {func.__name__}. "
                    f"Required roles: {', '.join(required_roles)}"
                )
        return wrapper
    return decorator

# Example protected functions
@has_permission(['ADMIN'])
def delete_database():
    """Only admins can delete the database"""
    print("Database deleted!")

@has_permission(['EDITOR', 'ADMIN'])
def edit_content():
    """Editors and admins can edit content"""
    print("Content edited!")

@has_permission(['AUTHOR', 'EDITOR', 'ADMIN'])
def publish_article():
    """Authors, editors and admins can publish"""
    print("Article published!")

@has_permission(['READER', 'AUTHOR', 'EDITOR', 'ADMIN'])
def view_content():
    """Everyone except guests can view content"""
    print("Content displayed!")

# Example usage
if __name__ == "__main__":
    try:
        # Try to access without login
        view_content()
    except PermissionError as e:
        print(f"Error: {e}")
    
    print("\n=== Alice (ADMIN) ===")
    login('alice', 'alice123')
    delete_database()
    edit_content()
    publish_article()
    view_content()
    logout()
    
    print("\n=== Bob (EDITOR) ===")
    login('bob', 'bob123')
    try:
        delete_database()
    except PermissionError as e:
        print(f"Error: {e}")
    edit_content()
    publish_article()
    view_content()
    logout()
    
    print("\n=== Charlie (AUTHOR) ===")
    login('charlie', 'charlie123')
    try:
        delete_database()
    except PermissionError as e:
        print(f"Error: {e}")
    try:
        edit_content()
    except PermissionError as e:
        print(f"Error: {e}")
    publish_article()
    view_content()
    logout()
    
    print("\n=== Dave (READER) ===")
    login('dave', 'dave123')
    try:
        publish_article()
    except PermissionError as e:
        print(f"Error: {e}")
    view_content()
    logout()
    
    print("\n=== Eve (GUEST) ===")
    login('eve', 'eve123')
    try:
        view_content()
    except PermissionError as e:
        print(f"Error: {e}")
    logout()