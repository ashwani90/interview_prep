# Create a Polynomial class to represent and evaluate polynomial expressions.

class Polynomial:
    def __init__(self, coefficients):
        """
        Initialize a polynomial with given coefficients.
        
        Args:
            coefficients: List of coefficients where coefficients[i] is the coefficient for x^i
                         Example: [1, 2, 3] represents 1 + 2x + 3x²
        """
        # Remove trailing zeros to normalize the polynomial
        self.coeffs = coefficients
        self._trim()
    
    def _trim(self):
        """Remove trailing zeros from coefficients"""
        while len(self.coeffs) > 1 and self.coeffs[-1] == 0:
            self.coeffs = self.coeffs[:-1]
    
    def degree(self):
        """Return the degree of the polynomial"""
        return len(self.coeffs) - 1
    
    def evaluate(self, x):
        """
        Evaluate the polynomial at point x using Horner's method.
        
        Args:
            x: The value at which to evaluate the polynomial
            
        Returns:
            The result of the polynomial evaluation
        """
        result = 0
        for coeff in reversed(self.coeffs):
            result = result * x + coeff
        return result
    
    def __add__(self, other):
        """Add two polynomials"""
        if isinstance(other, Polynomial):
            # Pad the shorter polynomial with zeros
            max_len = max(len(self.coeffs), len(other.coeffs))
            new_coeffs = [0] * max_len
            for i in range(len(self.coeffs)):
                new_coeffs[i] += self.coeffs[i]
            for i in range(len(other.coeffs)):
                new_coeffs[i] += other.coeffs[i]
            return Polynomial(new_coeffs)
        else:
            # Handle scalar addition
            new_coeffs = self.coeffs.copy()
            new_coeffs[0] += other
            return Polynomial(new_coeffs)
    
    def __sub__(self, other):
        """Subtract two polynomials"""
        if isinstance(other, Polynomial):
            # Pad the shorter polynomial with zeros
            max_len = max(len(self.coeffs), len(other.coeffs))
            new_coeffs = [0] * max_len
            for i in range(len(self.coeffs)):
                new_coeffs[i] += self.coeffs[i]
            for i in range(len(other.coeffs)):
                new_coeffs[i] -= other.coeffs[i]
            return Polynomial(new_coeffs)
        else:
            # Handle scalar subtraction
            new_coeffs = self.coeffs.copy()
            new_coeffs[0] -= other
            return Polynomial(new_coeffs)
    
    def __mul__(self, other):
        """Multiply two polynomials or a polynomial with a scalar"""
        if isinstance(other, Polynomial):
            # Polynomial multiplication
            new_coeffs = [0] * (len(self.coeffs) + len(other.coeffs) - 1)
            for i in range(len(self.coeffs)):
                for j in range(len(other.coeffs)):
                    new_coeffs[i + j] += self.coeffs[i] * other.coeffs[j]
            return Polynomial(new_coeffs)
        else:
            # Scalar multiplication
            new_coeffs = [coeff * other for coeff in self.coeffs]
            return Polynomial(new_coeffs)
    
    def __rmul__(self, other):
        """Handle right multiplication (for scalar * polynomial)"""
        return self.__mul__(other)
    
    def __pow__(self, power):
        """Raise polynomial to a positive integer power"""
        if not isinstance(power, int) or power < 0:
            raise ValueError("Power must be a non-negative integer")
        result = Polynomial([1])  # Identity polynomial (1)
        for _ in range(power):
            result *= self
        return result
    
    def derivative(self):
        """Compute the derivative of the polynomial"""
        if len(self.coeffs) == 1:
            return Polynomial([0])
        new_coeffs = [i * coeff for i, coeff in enumerate(self.coeffs[1:], 1)]
        return Polynomial(new_coeffs)
    
    def __str__(self):
        """String representation of the polynomial"""
        terms = []
        for power, coeff in enumerate(self.coeffs):
            if coeff == 0 and len(self.coeffs) > 1:
                continue
            if power == 0:
                terms.append(f"{coeff}")
            else:
                term = ""
                if coeff != 1:
                    term += f"{coeff}"
                term += "x"
                if power > 1:
                    term += f"^{power}"
                terms.append(term)
        if not terms:
            return "0"
        return " + ".join(terms)
    
    def __repr__(self):
        """Official string representation"""
        return f"Polynomial({self.coeffs})"


# Example usage
if __name__ == "__main__":
    # Create polynomials
    p1 = Polynomial([1, 2, 3])  # 1 + 2x + 3x²
    p2 = Polynomial([0, 1, 0, 4])  # x + 4x³
    
    print(f"p1 = {p1}")
    print(f"p2 = {p2}")
    print(f"Degree of p1: {p1.degree()}")
    print(f"Evaluate p1 at x=2: {p1.evaluate(2)}")
    
    # Operations
    print(f"\np1 + p2 = {p1 + p2}")
    print(f"p1 - p2 = {p1 - p2}")
    print(f"p1 * p2 = {p1 * p2}")
    print(f"p1 * 3 = {p1 * 3}")
    print(f"2 * p1 = {2 * p1}")
    print(f"p1 squared = {p1**2}")
    
    # Derivative
    print(f"\nDerivative of p1: {p1.derivative()}")
    print(f"Derivative of p2: {p2.derivative()}")