from functools import wraps

class CallGraphTracer:
    def __init__(self):
        self.call_graph = {}
        self.current_stack = []
    
    def trace(self, func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Record the function call
            caller = self.current_stack[-1] if self.current_stack else None
            
            if caller:
                if caller not in self.call_graph:
                    self.call_graph[caller] = []
                if func.__name__ not in self.call_graph[caller]:
                    self.call_graph[caller].append(func.__name__)
            
            # Add current function to stack
            self.current_stack.append(func.__name__)
            
            try:
                # Call the original function
                result = func(*args, **kwargs)
            finally:
                # Remove from stack after completion
                self.current_stack.pop()
            
            return result
        return wrapper
    
    def print_call_graph(self):
        print("Function Call Graph:")
        for caller, callees in self.call_graph.items():
            print(f"{caller} -> {', '.join(callees)}")

# Create a global tracer instance
tracer = CallGraphTracer()

# Example usage:
if __name__ == "__main__":
    @tracer.trace
    def foo():
        bar()
        baz()
    
    @tracer.trace
    def bar():
        pass
    
    @tracer.trace
    def baz():
        qux()
    
    @tracer.trace
    def qux():
        pass
    
    foo()
    tracer.print_call_graph()