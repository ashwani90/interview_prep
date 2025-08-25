import re
from typing import Dict, List, Union, Callable

class DSLInterpreter:
    def __init__(self):
        self._variables: Dict[str, Union[int, float, str, bool]] = {}
        self._functions: Dict[str, Callable] = {
            'print': self._print,
            'set': self._set_var,
            'if': self._if_condition,
            'loop': self._loop,
        }
        self._operators = {
            '+': lambda a, b: a + b,
            '-': lambda a, b: a - b,
            '*': lambda a, b: a * b,
            '/': lambda a, b: a / b,
            '==': lambda a, b: a == b,
            '!=': lambda a, b: a != b,
            '>': lambda a, b: a > b,
            '<': lambda a, b: a < b,
            '>=': lambda a, b: a >= b,
            '<=': lambda a, b: a <= b,
            'and': lambda a, b: a and b,
            'or': lambda a, b: a or b,
        }

    def execute(self, program: str) -> None:
        """Execute a DSL program"""
        statements = self._parse(program)
        for statement in statements:
            self._eval_statement(statement)

    def _parse(self, program: str) -> List[List[Union[str, List]]]:
        """Parse the DSL program into an AST"""
        tokens = self._tokenize(program)
        return self._build_ast(tokens)

    def _tokenize(self, program: str) -> List[str]:
        """Convert program text into tokens"""
        # Remove comments
        program = re.sub(r'#.*$', '', program, flags=re.MULTILINE)
        # Tokenize (simplified approach)
        tokens = []
        for token in re.findall(r'\(|\)|"[^"]*"|\'[^\']*\'|[^\s()]+', program):
            if token.strip():
                tokens.append(token)
        return tokens

    def _build_ast(self, tokens: List[str], idx: int = 0) -> List[List[Union[str, List]]]:
        """Build Abstract Syntax Tree from tokens"""
        ast = []
        while idx < len(tokens):
            token = tokens[idx]
            if token == '(':
                sub_expr, idx = self._build_ast(tokens, idx + 1)
                ast.append(sub_expr)
            elif token == ')':
                return ast, idx + 1
            else:
                # Handle literals
                if token.startswith('"') and token.endswith('"'):
                    ast.append(token[1:-1])
                elif token.startswith("'") and token.endswith("'"):
                    ast.append(token[1:-1])
                elif token.lower() == 'true':
                    ast.append(True)
                elif token.lower() == 'false':
                    ast.append(False)
                elif token.replace('.', '', 1).isdigit():
                    ast.append(float(token) if '.' in token else int(token))
                else:
                    ast.append(token)
                idx += 1
        return ast

    def _eval_statement(self, statement: Union[str, List]) -> Any:
        """Evaluate a single statement"""
        if not isinstance(statement, list):
            # Handle variables and literals
            if isinstance(statement, (int, float, str, bool)):
                return statement
            return self._variables.get(statement, None)

        # Function call
        func_name = statement[0]
        if func_name in self._functions:
            args = [self._eval_statement(arg) for arg in statement[1:]]
            return self._functions[func_name](*args)
        elif func_name in self._operators:
            if len(statement) != 3:
                raise SyntaxError(f"Operator {func_name} requires 2 operands")
            left = self._eval_statement(statement[1])
            right = self._eval_statement(statement[2])
            return self._operators[func_name](left, right)
        else:
            raise NameError(f"Unknown function or operator: {func_name}")

    # Built-in functions
    def _print(self, *args) -> None:
        """Print function for DSL"""
        print(' '.join(str(arg) for arg in args))

    def _set_var(self, name: str, value: Any) -> None:
        """Set variable in DSL"""
        self._variables[name] = value

    def _if_condition(self, condition: bool, true_block: List, false_block: List = None) -> None:
        """If condition for DSL"""
        if condition:
            self._eval_statement(true_block)
        elif false_block:
            self._eval_statement(false_block)

    def _loop(self, count: int, block: List) -> None:
        """Loop construct for DSL"""
        for _ in range(count):
            self._eval_statement(block)

# Example usage
if __name__ == "__main__":
    dsl = DSLInterpreter()

    # Sample DSL program
    program = """
    # Set variables
    (set x 10)
    (set y 20)

    # Print sum
    (print "Sum:" (+ x y))

    # Conditional example
    (if (> x 5)
        (print "x is greater than 5")
        (print "x is 5 or less"))

    # Loop example
    (loop 3
        (print "Loop iteration:" x)
        (set x (+ x 1)))
    """

    print("Running DSL program:")
    dsl.execute(program)

    # More complex example
    complex_program = """
    (set temperature 22.5)
    (set threshold 25.0)

    (if (and (>= temperature threshold) (<= temperature 30.0))
        (print "Temperature is in warning range:" temperature)
        (print "Temperature is normal"))

    (set counter 0)
    (loop 5
        (print "Counter:" counter)
        (set counter (+ counter 1)))
    """

    print("\nRunning complex DSL program:")
    dsl.execute(complex_program)