# Build a FileHandler class that opens, reads, and writes to files using a context manager (__enter__, __exit__).

class FileHandler:
    def __init__(self, filename, mode='r'):
        """
        Initialize the FileHandler.
        
        Args:
            filename (str): Path to the file
            mode (str): File mode ('r' for read, 'w' for write, 'a' for append)
        """
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        """Enter the runtime context - open the file"""
        self.file = open(self.filename, self.mode)
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Exit the runtime context - close the file"""
        if self.file:
            self.file.close()
        
        # Handle specific exceptions if needed
        if exc_type is IOError:
            print(f"Error occurred while working with file: {exc_val}")
            return True  # Suppress the exception
        
        return False  # Propagate any other exceptions
    
    def read(self):
        """Read the entire file content"""
        if 'r' not in self.mode:
            raise ValueError("File not opened in read mode")
        return self.file.read()
    
    def read_lines(self):
        """Read lines from the file"""
        if 'r' not in self.mode:
            raise ValueError("File not opened in read mode")
        return self.file.readlines()
    
    def write(self, content):
        """Write content to the file"""
        if 'w' not in self.mode and 'a' not in self.mode:
            raise ValueError("File not opened in write/append mode")
        self.file.write(content)
    
    def write_lines(self, lines):
        """Write multiple lines to the file"""
        if 'w' not in self.mode and 'a' not in self.mode:
            raise ValueError("File not opened in write/append mode")
        self.file.writelines(lines)


# Example usage
if __name__ == "__main__":
    # Writing to a file
    with FileHandler('example.txt', 'w') as fh:
        fh.write("Hello, World!\n")
        fh.write_lines(["Second line\n", "Third line\n"])
    
    # Reading from a file
    with FileHandler('example.txt') as fh:  # Default mode is 'r'
        content = fh.read()
        print("File content:")
        print(content)
    
    # Appending to a file
    with FileHandler('example.txt', 'a') as fh:
        fh.write("Appended line\n")
    
    # Reading line by line
    with FileHandler('example.txt') as fh:
        print("\nFile content line by line:")
        for line in fh.read_lines():
            print(line.strip())