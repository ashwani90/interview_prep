import heapq

numbers = [3, 1, 4, 1, 5, 9, 2, 6]
print(heapq.nsmallest(3, numbers))
print(heapq.nlargest(3, numbers))

# smallest item is always the first
heapq.heapify(numbers)
print(numbers)

