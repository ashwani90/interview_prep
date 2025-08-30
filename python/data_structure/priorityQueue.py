import heapq

class DynamicPriorityQueue:
    def __init__(self, priority_func=None):
        """
        Initialize a priority queue with dynamic priority rules.
        
        Args:
            priority_func: A function that takes an item and returns its priority value.
                          If None, uses the item itself for comparison.
        """
        self._heap = []
        self._priority_func = priority_func or (lambda x: x)
        self._index = 0  # Used to break ties and maintain insertion order

    def push(self, item):
        """Push an item onto the queue with dynamic priority"""
        # Store the priority value to avoid recalculating it
        priority = self._priority_func(item)
        heapq.heappush(self._heap, (priority, self._index, item))
        self._index += 1

    def pop(self):
        """Pop the item with the highest priority (smallest priority value)"""
        if not self._heap:
            raise IndexError("pop from empty priority queue")
        return heapq.heappop(self._heap)[2]  # Return just the item

    def peek(self):
        """Return the highest priority item without removing it"""
        if not self._heap:
            raise IndexError("peek from empty priority queue")
        return self._heap[0][2]  # Return just the item

    def __len__(self):
        """Return the number of items in the queue"""
        return len(self._heap)

    def change_priority_func(self, new_priority_func):
        """
        Change the priority function and re-heapify the queue.
        This is an O(n) operation.
        """
        self._priority_func = new_priority_func
        # Rebuild the heap with new priorities
        items = [x[2] for x in self._heap]  # Extract all items
        self._heap = []
        self._index = 0
        for item in items:
            self.push(item)

    def __str__(self):
        """String representation of the queue (for debugging)"""
        return f"DynamicPriorityQueue({[x[2] for x in sorted(self._heap)]})"

# Example usage
if __name__ == "__main__":
    # Example 1: Default behavior (min-heap)
    pq = DynamicPriorityQueue()
    pq.push(5)
    pq.push(1)
    pq.push(3)
    print("Example 1 - Default (min-heap):")
    print(f"Next item: {pq.peek()}")  # 1
    print(f"All items in order: {[pq.pop() for _ in range(len(pq))]}")  # [1, 3, 5]

    # Example 2: Max-heap using negative values
    pq = DynamicPriorityQueue(priority_func=lambda x: -x)
    pq.push(5)
    pq.push(1)
    pq.push(3)
    print("\nExample 2 - Max-heap:")
    print(f"Next item: {pq.peek()}")  # 5
    print(f"All items in order: {[pq.pop() for _ in range(len(pq))]}")  # [5, 3, 1]

    # Example 3: Custom objects with dynamic priority
    class Task:
        def __init__(self, name, urgency, importance):
            self.name = name
            self.urgency = urgency
            self.importance = importance
        
        def __repr__(self):
            return f"Task('{self.name}', urgency={self.urgency}, importance={self.importance})"

    tasks = [
        Task("Write report", 3, 5),
        Task("Fix bug", 5, 4),
        Task("Update docs", 2, 3)
    ]

    # First prioritize by urgency
    print("\nExample 3 - Prioritizing by urgency:")
    pq = DynamicPriorityQueue(priority_func=lambda task: -task.urgency)  # Higher urgency first
    for task in tasks:
        pq.push(task)
    print(f"Tasks by urgency: {[pq.pop() for _ in range(len(pq))]}")

    # Then change to prioritize by importance
    print("\nChanging to prioritize by importance:")
    pq = DynamicPriorityQueue(priority_func=lambda task: -task.importance)  # Higher importance first
    for task in tasks:
        pq.push(task)
    print(f"Tasks by importance: {[pq.pop() for _ in range(len(pq))]}")

    # Example 4: Dynamic priority change
    print("\nExample 4 - Changing priority function dynamically:")
    pq = DynamicPriorityQueue(priority_func=lambda task: -task.urgency)
    for task in tasks:
        pq.push(task)
    print(f"Initial order (urgency): {[pq.pop() for _ in range(len(pq))]}")

    # Re-add tasks and change priority
    for task in tasks:
        pq.push(task)
    pq.change_priority_func(lambda task: -task.importance)
    print(f"After change (importance): {[pq.pop() for _ in range(len(pq))]}")