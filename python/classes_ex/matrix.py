# Implement a Matrix class that supports matrix addition using __add__.

class Matrix:
    def __init__(self, data):
        """
        Initialize a matrix with given data.
        
        Args:
            data: A 2D list representing the matrix (e.g., [[1, 2], [3, 4]])
        """
        if not all(len(row) == len(data[0]) for row in data):
            raise ValueError("All rows must have the same number of columns")
        self.rows = len(data)
        self.cols = len(data[0])
        self.data = data
    
    def __add__(self, other):
        """
        Add two matrices of the same dimensions.
        
        Args:
            other: Another Matrix object
            
        Returns:
            A new Matrix object representing the sum
        """
        if self.rows != other.rows or self.cols != other.cols:
            raise ValueError("Matrices must have the same dimensions for addition")
        
        # Create a new matrix with element-wise sums
        result_data = [
            [self.data[i][j] + other.data[i][j] for j in range(self.cols)]
            for i in range(self.rows)
        ]
        return Matrix(result_data)
    
    def __str__(self):
        """String representation of the matrix"""
        return '\n'.join([' '.join(map(str, row)) for row in self.data])
    
    def __repr__(self):
        """Official string representation"""
        return f'Matrix({self.data})'


# Example usage
if __name__ == "__main__":
    # Create two matrices
    m1 = Matrix([[1, 2, 3], [4, 5, 6]])
    m2 = Matrix([[7, 8, 9], [10, 11, 12]])
    
    print("Matrix 1:")
    print(m1)
    print("\nMatrix 2:")
    print(m2)
    
    # Add matrices using the + operator
    m3 = m1 + m2
    print("\nMatrix 1 + Matrix 2:")
    print(m3)