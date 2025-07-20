# Create a Timer class that uses time.time() to track elapsed time.


import time
class Timer:
    def __init__(self):
        self.start_time = None

    def start(self):
        """Start the timer."""
        self.start_time = time.time()
        print("Timer started.")

    def stop(self):
        """Stop the timer and return the elapsed time in seconds."""
        if self.start_time is None:
            raise ValueError("Timer has not been started.")
        elapsed_time = time.time() - self.start_time
        self.start_time = None  # Reset the timer
        print(f"Timer stopped. Elapsed time: {elapsed_time:.2f} seconds")
        return elapsed_time
    def reset(self):
        """Reset the timer."""
        self.start_time = None
        print("Timer reset.")
    def is_running(self):
        """Check if the timer is currently running."""
        return self.start_time is not None
    
# Example usage
timer = Timer()
timer.start()  # Start the timer
time.sleep(5)
print(timer.stop())  # Stop the timer and print elapsed time