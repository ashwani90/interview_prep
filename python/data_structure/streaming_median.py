import heapq

class StreamingMedian:
    def __init__(self):
        # Max heap for the lower half (using negative values for max heap simulation)
        self.lower_half = []
        # Min heap for the upper half
        self.upper_half = []

    def add_number(self, num: float) -> None:
        # Always add to the max heap first
        if not self.lower_half or num <= -self.lower_half[0]:
            heapq.heappush(self.lower_half, -num)
        else:
            heapq.heappush(self.upper_half, num)
        
        # Balance the heaps
        self._balance_heaps()

    def _balance_heaps(self) -> None:
        # Ensure lower half is always equal or one greater than upper half
        if len(self.lower_half) > len(self.upper_half) + 1:
            moved_num = -heapq.heappop(self.lower_half)
            heapq.heappush(self.upper_half, moved_num)
        elif len(self.upper_half) > len(self.lower_half):
            moved_num = heapq.heappop(self.upper_half)
            heapq.heappush(self.lower_half, -moved_num)

    def get_median(self) -> float:
        if not self.lower_half and not self.upper_half:
            raise ValueError("No numbers added yet")
        
        if len(self.lower_half) == len(self.upper_half):
            # Even count of numbers, average of two middle numbers
            return (-self.lower_half[0] + self.upper_half[0]) / 2
        else:
            # Odd count of numbers, middle number is in lower half
            return -self.lower_half[0]

# Example usage
if __name__ == "__main__":
    median_finder = StreamingMedian()
    numbers = [5, 10, 3, 8, 2, 7, 9, 1, 6, 4]
    
    print("Number -> Median")
    for num in numbers:
        median_finder.add_number(num)
        print(f"{num} -> {median_finder.get_median()}")