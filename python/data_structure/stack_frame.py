import inspect
from pprint import pprint

def inspect_stack_frame(levels_up=0):
    """
    Inspect the current stack frame and print local variables, arguments, and call stack.
    
    Args:
        levels_up: How many frames to go up in the call stack (0 = current frame)
    """
    # Get the frame object
    frame = inspect.currentframe()
    
    try:
        # Move up the requested number of frames
        for _ in range(levels_up + 1):
            if frame.f_back is None:
                break
            frame = frame.f_back
        
        # Get frame information
        frame_info = inspect.getframeinfo(frame)
        
        print("\n" + "=" * 50)
        print(f"Stack Frame Inspection (level {levels_up}):")
        print(f"File: {frame_info.filename}")
        print(f"Function: {frame_info.function}")
        print(f"Line: {frame_info.lineno}")
        
        # Get local variables
        print("\nLocal Variables:")
        pprint(frame.f_locals)
        
        # Get function arguments if this is a function frame
        if frame_info.function != "<module>":
            args, varargs, varkw, defaults, kwonlyargs, kwonlydefaults, annotations = (
                inspect.getfullargspec(frame.f_code)
            )
            print("\nFunction Arguments:")
            print(f"Positional args: {args}")
            if varargs:
                print(f"*args: {varargs}")
            if varkw:
                print(f"**kwargs: {varkw}")
            if defaults:
                print(f"Defaults: {defaults}")
        
        # Print call stack
        print("\nCall Stack:")
        for f in inspect.getouterframes(frame):
            print(f"  {f.function}() in {f.filename}, line {f.lineno}")
        
    finally:
        # Important: avoid reference cycles
        del frame


# Example usage
def example_function(x, y, z=10, *args, **kwargs):
    a = x + y
    b = z * 2
    local_var = "hello"
    inspect_stack_frame()  # Inspect current frame
    inspect_stack_frame(1)  # Inspect caller's frame
    return a + b

def caller_function():
    example_function(1, 2, 3, 4, 5, extra=42)

if __name__ == "__main__":
    caller_function()