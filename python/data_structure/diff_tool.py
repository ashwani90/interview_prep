import os
from typing import Optional, Tuple

CHUNK_SIZE = 1024 * 1024  # 1MB chunks

def file_diff(file1_path: str, file2_path: str) -> Optional[Tuple[int, bytes, bytes]]:
    """
    Compare two files chunk by chunk.
    
    Args:
        file1_path: Path to first file
        file2_path: Path to second file
    
    Returns:
        Tuple of (position, chunk1, chunk2) at first difference found
        None if files are identical
    """
    # First check file sizes
    size1 = os.path.getsize(file1_path)
    size2 = os.path.getsize(file2_path)
    
    if size1 != size2:
        return (0, b"<files differ in size>", b"<files differ in size>")
    
    # Open both files for binary reading
    with open(file1_path, 'rb') as f1, open(file2_path, 'rb') as f2:
        position = 0
        
        while True:
            # Read chunks from both files
            chunk1 = f1.read(CHUNK_SIZE)
            chunk2 = f2.read(CHUNK_SIZE)
            
            # Check if we've reached the end of both files
            if not chunk1 and not chunk2:
                return None  # Files are identical
            
            # Compare chunks
            if chunk1 != chunk2:
                # Find the exact position within the chunk
                for i, (b1, b2) in enumerate(zip(chunk1, chunk2)):
                    if b1 != b2:
                        return (position + i, bytes([b1]), bytes([b2]))
                return (position + min(len(chunk1), len(chunk2)), chunk1, chunk2)
            
            position += len(chunk1)

def main():
    import sys
    
    if len(sys.argv) != 3:
        print("Usage: python file_diff.py <file1> <file2>")
        return
    
    file1, file2 = sys.argv[1], sys.argv[2]
    
    print(f"Comparing {file1} and {file2}...")
    result = file_diff(file1, file2)
    
    if result is None:
        print("Files are identical")
    else:
        pos, chunk1, chunk2 = result
        print(f"Files differ at position {pos}:")
        print(f"  {file1}: {chunk1}")
        print(f"  {file2}: {chunk2}")

if __name__ == "__main__":
    # Create sample files for demonstration
    with open("file1.bin", "wb") as f:
        f.write(b"This is a test file with some content. " * 1000)
        f.write(b"The difference is here: X")
        f.write(b"More content..." * 1000)
    
    with open("file2.bin", "wb") as f:
        f.write(b"This is a test file with some content. " * 1000)
        f.write(b"The difference is here: Y")
        f.write(b"More content..." * 1000)
    
    # Run the comparison
    main()