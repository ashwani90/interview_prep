from contextlib import contextmanager
import time

@contextmanager
def timer():
    start = timer.time()
    yield start
    print("Time:", time.time() - start)

