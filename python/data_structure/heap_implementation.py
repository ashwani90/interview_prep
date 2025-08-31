class MinHeap:
    def __init__(self, array=None):
        """Initialize a min-heap, optionally heapifying an existing array"""
        self.heap = []
        if array is not None:
            self.heap = array.copy()
            self._heapify()
    
    def _heapify(self):
        """Transform list into a min-heap in O(n) time"""
        n = len(self.heap)
        for i in reversed(range(n // 2)):
            self._sift_down(i)
    
    def _sift_up(self, idx):
        """Move element up to maintain heap property"""
        parent = (idx - 1) // 2
        while idx > 0 and self.heap[idx] < self.heap[parent]:
            self.heap[idx], self.heap[parent] = self.heap[parent], self.heap[idx]
            idx = parent
            parent = (idx - 1) // 2
    
    def _sift_down(self, idx):
        """Move element down to maintain heap property"""
        n = len(self.heap)
        while True:
            left = 2 * idx + 1
            right = 2 * idx + 2
            smallest = idx
            
            if left < n and self.heap[left] < self.heap[smallest]:
                smallest = left
            if right < n and self.heap[right] < self.heap[smallest]:
                smallest = right
            
            if smallest == idx:
                break
                
            self.heap[idx], self.heap[smallest] = self.heap[smallest], self.heap[idx]
            idx = smallest
    
    def heappush(self, value):
        """Add new element to the heap"""
        self.heap.append(value)
        self._sift_up(len(self.heap) - 1)
    
    def heappop(self):
        """Remove and return smallest element"""
        if not self.heap:
            raise IndexError("pop from empty heap")
        
        min_val = self.heap[0]
        last = self.heap.pop()
        
        if self.heap:
            self.heap[0] = last
            self._sift_down(0)
        
        return min_val
    
    def __len__(self):
        return len(self.heap)
    
    def __repr__(self):
        return f"MinHeap({self.heap})"

class MaxHeap:
    def __init__(self, array=None):
        """Initialize a max-heap, optionally heapifying an existing array"""
        self.heap = []
        if array is not None:
            self.heap = array.copy()
            self._heapify()
    
    def _heapify(self):
        """Transform list into a max-heap in O(n) time"""
        n = len(self.heap)
        for i in reversed(range(n // 2)):
            self._sift_down(i)
    
    def _sift_up(self, idx):
        """Move element up to maintain heap property"""
        parent = (idx - 1) // 2
        while idx > 0 and self.heap[idx] > self.heap[parent]:
            self.heap[idx], self.heap[parent] = self.heap[parent], self.heap[idx]
            idx = parent
            parent = (idx - 1) // 2
    
    def _sift_down(self, idx):
        """Move element down to maintain heap property"""
        n = len(self.heap)
        while True:
            left = 2 * idx + 1
            right = 2 * idx + 2
            largest = idx
            
            if left < n and self.heap[left] > self.heap[largest]:
                largest = left
            if right < n and self.heap[right] > self.heap[largest]:
                largest = right
            
            if largest == idx:
                break
                
            self.heap[idx], self.heap[largest] = self.heap[largest], self.heap[idx]
            idx = largest
    
    def heappush(self, value):
        """Add new element to the heap"""
        self.heap.append(value)
        self._sift_up(len(self.heap) - 1)
    
    def heappop(self):
        """Remove and return largest element"""
        if not self.heap:
            raise IndexError("pop from empty heap")
        
        max_val = self.heap[0]
        last = self.heap.pop()
        
        if self.heap:
            self.heap[0] = last
            self._sift_down(0)
        
        return max_val
    
    def __len__(self):
        return len(self.heap)
    
    def __repr__(self):
        return f"MaxHeap({self.heap})"

# Example usage
if __name__ == "__main__":
    print("=== MinHeap Example ===")
    min_heap = MinHeap([4, 2, 8, 1, 5])
    print("Initial heap:", min_heap)
    
    min_heap.heappush(3)
    print("After pushing 3:", min_heap)
    
    print("Popped:", min_heap.heappop())
    print("After pop:", min_heap)
    
    print("\n=== MaxHeap Example ===")
    max_heap = MaxHeap([4, 2, 8, 1, 5])
    print("Initial heap:", max_heap)
    
    max_heap.heappush(10)
    print("After pushing 10:", max_heap)
    
    print("Popped:", max_heap.heappop())
    print("After pop:", max_heap)
    
    print("\n=== Heap Operations ===")
    nums = [3, 1, 4, 1, 5, 9, 2, 6]
    print("Original array:", nums)
    
    min_h = MinHeap(nums)
    print("MinHeap:", min_h)
    print("Sorted (ascending):", [min_h.heappop() for _ in range(len(min_h))])
    
    max_h = MaxHeap(nums)
    print("MaxHeap:", max_h)
    print("Sorted (descending):", [max_h.heappop() for _ in range(len(max_h))])