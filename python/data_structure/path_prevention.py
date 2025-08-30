import os
from pathlib import Path

def safe_join(base_directory: str, requested_path: str) -> str:
    """
    Safely join base directory with requested path, preventing path traversal.
    
    Args:
        base_directory: The trusted base directory
        requested_path: The untrusted user input path
        
    Returns:
        Safe absolute path within the base directory
        
    Raises:
        ValueError: If path traversal is attempted
    """
    # Convert to absolute paths
    base_dir = os.path.abspath(base_directory)
    requested_path = os.path.normpath(requested_path)
    
    # Join the paths
    full_path = os.path.abspath(os.path.join(base_dir, requested_path))
    
    # Verify the final path is within the base directory
    if not full_path.startswith(base_dir):
        raise ValueError("Potential path traversal attack detected")
    
    return full_path

# Alternative version using pathlib
def safe_join_pathlib(base_directory: str, requested_path: str) -> str:
    """
    Pathlib version of safe_join for cleaner path handling.
    """
    base_path = Path(base_directory).resolve()
    requested_path = Path(requested_path)
    
    # Resolve the full path (removes any ../ or ./)
    full_path = (base_path / requested_path).resolve()
    
    # Verify the path is within base directory
    try:
        full_path.relative_to(base_path)
    except ValueError:
        raise ValueError("Potential path traversal attack detected")
    
    return str(full_path)

# Example usage
if __name__ == "__main__":
    BASE_DIR = "/var/www/uploads"
    
    # Test cases
    test_cases = [
        ("valid_subdir/file.txt", True),
        ("../sensitive.txt", False),
        ("subdir/../../etc/passwd", False),
        ("./allowed.txt", True),
        ("subdir/valid.txt", True),
        ("/absolute/path", False),
        ("subdir/../../../breakout", False)
    ]
    
    print("Testing path traversal prevention:")
    for path, should_pass in test_cases:
        try:
            result = safe_join(BASE_DIR, path)
            status = "✓" if should_pass else "✗ (THIS SHOULD FAIL)"
            print(f"{status} {path} -> {result}")
        except ValueError as e:
            status = "✗" if not should_pass else "✓ (THIS SHOULD PASS)"
            print(f"{status} {path} -> {e}")