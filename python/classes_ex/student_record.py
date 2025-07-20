# Create a StudentRecord class that supports comparison by GPA using __lt__, __gt__.

class StudentRecord:
    def __init__(self, name: str, student_id: str, gpa: float):
        """
        Initialize a student record
        
        Args:
            name (str): Student's full name
            student_id (str): Unique student identifier
            gpa (float): Grade point average (0.0-4.0 scale)
        """
        self.name = name
        self.student_id = student_id
        self.gpa = gpa
    
    def __lt__(self, other):
        """Less than comparison based on GPA"""
        if not isinstance(other, StudentRecord):
            return NotImplemented
        return self.gpa < other.gpa
    
    def __gt__(self, other):
        """Greater than comparison based on GPA"""
        if not isinstance(other, StudentRecord):
            return NotImplemented
        return self.gpa > other.gpa
    
    def __eq__(self, other):
        """Equality comparison based on all attributes"""
        if not isinstance(other, StudentRecord):
            return NotImplemented
        return (self.name == other.name and 
                self.student_id == other.student_id and 
                self.gpa == other.gpa)
    
    def __le__(self, other):
        """Less than or equal comparison"""
        return self < other or self == other
    
    def __ge__(self, other):
        """Greater than or equal comparison"""
        return self > other or self == other
    
    def __str__(self):
        """String representation of the student record"""
        return f"StudentRecord(name='{self.name}', id={self.student_id}, GPA={self.gpa:.2f})"
    
    def __repr__(self):
        """Official string representation"""
        return f"StudentRecord(name={repr(self.name)}, student_id={repr(self.student_id)}, gpa={self.gpa})"


# Example usage
if __name__ == "__main__":
    # Create student records
    alice = StudentRecord("Alice Johnson", "S1001", 3.92)
    bob = StudentRecord("Bob Smith", "S1002", 3.45)
    carol = StudentRecord("Carol Williams", "S1003", 3.92)
    
    # Test comparisons
    print(f"{alice.name} > {bob.name}: {alice > bob}")  # True
    print(f"{bob.name} < {alice.name}: {bob < alice}")  # True
    print(f"{alice.name} == {carol.name}: {alice == carol}")  # False
    print(f"{alice.name} >= {carol.name}: {alice >= carol}")  # True (same GPA)
    print(f"{alice.name} <= {carol.name}: {alice <= carol}")  # True (same GPA)
    
    # Sorting demonstration
    students = [
        StudentRecord("David Lee", "S1004", 2.98),
        alice,
        StudentRecord("Eve Brown", "S1005", 3.67),
        bob,
        carol
    ]
    
    print("\nStudents sorted by GPA (descending):")
    for student in sorted(students, reverse=True):
        print(f"  {student.name}: {student.gpa:.2f}")