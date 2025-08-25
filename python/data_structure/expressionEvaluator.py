import operator

class ExpressionEvaluator:
    """Evaluates arithmetic expressions using Dijkstra's shunting-yard algorithm"""
    
    def __init__(self):
        # Define operator precedence and operations
        self.operators = {
            '+': (1, operator.add),
            '-': (1, operator.sub),
            '*': (2, operator.mul),
            '/': (2, operator.truediv),
            '^': (3, operator.pow),
        }
        self.left_parenthesis = '('
        self.right_parenthesis = ')'
    
    def evaluate(self, expression: str) -> float:
        """Evaluate an infix arithmetic expression"""
        tokens = self._tokenize(expression)
        postfix = self._shunting_yard(tokens)
        return self._evaluate_postfix(postfix)
    
    def _tokenize(self, expression: str) -> list:
        """Convert expression string into tokens (numbers, operators, parentheses)"""
        tokens = []
        i = 0
        n = len(expression)
        
        while i < n:
            c = expression[i]
            
            if c.isspace():
                i += 1
                continue
            
            if c.isdigit() or c == '.':
                # Parse number (including decimals)
                j = i
                while j < n and (expression[j].isdigit() or expression[j] == '.'):
                    j += 1
                tokens.append(expression[i:j])
                i = j
            elif c in self.operators or c in (self.left_parenthesis, self.right_parenthesis):
                # Handle operators and parentheses
                if c == '-' and (not tokens or tokens[-1] == self.left_parenthesis):
                    # Handle negative numbers
                    j = i + 1
                    while j < n and (expression[j].isdigit() or expression[j] == '.'):
                        j += 1
                    tokens.append(expression[i:j])
                    i = j
                else:
                    tokens.append(c)
                    i += 1
            else:
                raise ValueError(f"Invalid character: {c}")
        
        return tokens
    
    def _shunting_yard(self, tokens: list) -> list:
        """Convert infix notation to postfix (RPN) using shunting-yard algorithm"""
        output = []
        operator_stack = []
        
        for token in tokens:
            if self._is_number(token):
                output.append(float(token))
            elif token in self.operators:
                # Process operators with higher or equal precedence
                while (operator_stack and 
                       operator_stack[-1] != self.left_parenthesis and
                       self.operators[operator_stack[-1]][0] >= self.operators[token][0]):
                    output.append(operator_stack.pop())
                operator_stack.append(token)
            elif token == self.left_parenthesis:
                operator_stack.append(token)
            elif token == self.right_parenthesis:
                # Pop until left parenthesis is found
                while operator_stack and operator_stack[-1] != self.left_parenthesis:
                    output.append(operator_stack.pop())
                if not operator_stack or operator_stack[-1] != self.left_parenthesis:
                    raise ValueError("Mismatched parentheses")
                operator_stack.pop()  # Remove the left parenthesis
        
        # Pop remaining operators
        while operator_stack:
            if operator_stack[-1] == self.left_parenthesis:
                raise ValueError("Mismatched parentheses")
            output.append(operator_stack.pop())
        
        return output
    
    def _evaluate_postfix(self, postfix: list) -> float:
        """Evaluate postfix notation (Reverse Polish Notation)"""
        stack = []
        
        for token in postfix:
            if isinstance(token, float):
                stack.append(token)
            elif token in self.operators:
                if len(stack) < 2:
                    raise ValueError("Insufficient operands")
                b = stack.pop()
                a = stack.pop()
                operation = self.operators[token][1]
                try:
                    result = operation(a, b)
                except ZeroDivisionError:
                    raise ValueError("Division by zero")
                stack.append(result)
            else:
                raise ValueError(f"Invalid token: {token}")
        
        if len(stack) != 1:
            raise ValueError("Invalid expression")
        
        return stack[0]
    
    def _is_number(self, s: str) -> bool:
        """Check if a string represents a valid number"""
        try:
            float(s)
            return True
        except ValueError:
            return False

# Example usage
if __name__ == "__main__":
    evaluator = ExpressionEvaluator()
    
    expressions = [
        "3 + 4 * 2",
        "(3 + 4) * 2",
        "3 + (2 * 4) / 2",
        "10 - 2 ^ 3",
        "3 * (4 + (2 - 5)) / 2",
        "-5 + 3 * 2",
        "2 + 2 * (3 + (4 * 2 + 1) / 5)"
    ]
    
    for expr in expressions:
        try:
            result = evaluator.evaluate(expr)
            print(f"'{expr}' = {result}")
        except ValueError as e:
            print(f"Error evaluating '{expr}': {e}")