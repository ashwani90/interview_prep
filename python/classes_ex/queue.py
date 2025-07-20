# Implement a Queue and Stack class using OOP (not collections).

class Queue:
    def __init__(self):
        """Initialize an empty queue"""
        self.items = []
        self.front_index = 0  # Tracks the front of the queue
    
    def enqueue(self, item):
        """Add an item to the end of the queue"""
        self.items.append(item)
    
    def dequeue(self):
        """
        Remove and return the item at the front of the queue
        
        Raises:
            IndexError: If queue is empty
        """
        if self.is_empty():
            raise IndexError("Queue is empty")
        item = self.items[self.front_index]
        self.front_index += 1
        
        # Periodically clean up memory when many items have been dequeued
        if self.front_index * 2 > len(self.items):
            self.items = self.items[self.front_index:]
            self.front_index = 0
            
        return item
    
    def front(self):
        """Return the item at the front without removing it"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items[self.front_index]
    
    def is_empty(self):
        """Check if the queue is empty"""
        return self.front_index >= len(self.items)
    
    def size(self):
        """Return the number of items in the queue"""
        return len(self.items) - self.front_index
    
    def __str__(self):
        """String representation of the queue"""
        return f"Queue({self.items[self.front_index:]})"


class Stack:
    def __init__(self):
        """Initialize an empty stack"""
        self.items = []
    
    def push(self, item):
        """Add an item to the top of the stack"""
        self.items.append(item)
    
    def pop(self):
        """
        Remove and return the item from the top of the stack
        
        Raises:
            IndexError: If stack is empty
        """
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items.pop()
    
    def peek(self):
        """Return the top item without removing it"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items[-1]
    
    def is_empty(self):
        """Check if the stack is empty"""
        return len(self.items) == 0
    
    def size(self):
        """Return the number of items in the stack"""
        return len(self.items)
    
    def __str__(self):
        """String representation of the stack"""
        return f"Stack({self.items})"


# Example usage
if __name__ == "__main__":
    print("=== Queue Demo ===")
    q = Queue()
    print(f"Initial queue: {q}")
    print(f"Is empty? {q.is_empty()}")
    
    q.enqueue(10)
    q.enqueue(20)
    q.enqueue(30)
    print(f"After enqueues: {q}")
    
    print(f"Front item: {q.front()}")
    print(f"Dequeue: {q.dequeue()}")
    print(f"After dequeue: {q}")
    print(f"Size: {q.size()}")
    
    print("\n=== Stack Demo ===")
    s = Stack()
    print(f"Initial stack: {s}")
    print(f"Is empty? {s.is_empty()}")
    
    s.push(100)
    s.push(200)
    s.push(300)
    print(f"After pushes: {s}")
    
    print(f"Top item: {s.peek()}")
    print(f"Pop: {s.pop()}")
    print(f"After pop: {s}")
    print(f"Size: {s.size()}")