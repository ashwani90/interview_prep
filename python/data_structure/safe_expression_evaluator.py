import ast
import operator
import math
from typing import Dict, Any

class SafeMathEvaluator:
    """Safely evaluate mathematical expressions using AST parsing"""
    
    # Supported operators
    _OPERATORS: Dict[type, Any] = {
        ast.Add: operator.add,
        ast.Sub: operator.sub,
        ast.Mult: operator.mul,
        ast.Div: operator.truediv,
        ast.Pow: operator.pow,
        ast.USub: operator.neg,
        ast.Mod: operator.mod,
    }
    
    # Supported functions
    _FUNCTIONS: Dict[str, Any] = {
        'abs': abs,
        'round': round,
        'min': min,
        'max': max,
        'sqrt': math.sqrt,
        'log': math.log,
        'log10': math.log10,
        'sin': math.sin,
        'cos': math.cos,
        'tan': math.tan,
    }
    
    # Supported constants
    _CONSTANTS: Dict[str, Any] = {
        'pi': math.pi,
        'e': math.e,
    }
    
    def __init__(self):
        self._variables: Dict[str, float] = {}
    
    def evaluate(self, expression: str) -> float:
        """Safely evaluate a mathematical expression"""
        try:
            node = ast.parse(expression, mode='eval')
            return self._eval(node.body)
        except (SyntaxError, TypeError, ValueError) as e:
            raise ValueError(f"Invalid expression: {e}") from e
    
    def _eval(self, node: ast.AST) -> float:
        """Recursively evaluate AST nodes"""
        if isinstance(node, ast.Num):  # Number
            return node.n
        elif isinstance(node, ast.Name):  # Variable or constant
            if node.id in self._CONSTANTS:
                return self._CONSTANTS[node.id]
            elif node.id in self._variables:
                return self._variables[node.id]
            else:
                raise ValueError(f"Unknown identifier: '{node.id}'")
        elif isinstance(node, ast.UnaryOp):  # Unary operations like -x
            return self._OPERATORS[type(node.op)](self._eval(node.operand))
        elif isinstance(node, ast.BinOp):  # Binary operations like x + y
            return self._OPERATORS[type(node.op)](
                self._eval(node.left),
                self._eval(node.right)
            )
        elif isinstance(node, ast.Call):  # Function calls like sqrt(x)
            if not isinstance(node.func, ast.Name):
                raise ValueError("Only named functions are supported")
            if node.func.id not in self._FUNCTIONS:
                raise ValueError(f"Unsupported function: '{node.func.id}'")
            args = [self._eval(arg) for arg in node.args]
            return self._FUNCTIONS[node.func.id](*args)
        else:
            raise ValueError(f"Unsupported operation: {type(node).__name__}")
    
    def set_variable(self, name: str, value: float) -> None:
        """Set a variable value that can be used in expressions"""
        if not name.isidentifier():
            raise ValueError(f"Invalid variable name: '{name}'")
        self._variables[name] = value
    
    def clear_variables(self) -> None:
        """Clear all variables"""
        self._variables.clear()

# Example usage
if __name__ == "__main__":
    evaluator = SafeMathEvaluator()
    
    # Basic arithmetic
    print("2 + 3 * 4 =", evaluator.evaluate("2 + 3 * 4"))
    
    # Functions and constants
    print("sqrt(16) + pi =", evaluator.evaluate("sqrt(16) + pi"))
    
    # Variables
    evaluator.set_variable('x', 5)
    evaluator.set_variable('y', 10)
    print("x * y - 3 =", evaluator.evaluate("x * y - 3"))
    
    # Complex expression
    print("(x + y) ** 2 / 4 =", evaluator.evaluate("(x + y) ** 2 / 4"))
    
    # Error handling examples
    try:
        print(evaluator.evaluate("import os"))
    except ValueError as e:
        print("Security test 1:", e)
    
    try:
        print(evaluator.evaluate("__import__('os').system('ls')"))
    except ValueError as e:
        print("Security test 2:", e)
    
    try:
        print(evaluator.evaluate("unknown_function(1)"))
    except ValueError as e:
        print("Security test 3:", e)