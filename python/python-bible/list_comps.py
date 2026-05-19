squares = [x*x for x in range(10)]
# list comps are a bit faster
# More complex
a = [x for x in range(10) if x % 2 == 0 else None]

# Whitespaces in comprehensions are also allowed

# Conditional list expression 
[x for x in range(10) if x % 2 == 0]
# prints even values

# flatten a list
reduce(lambda x, y: x + y, [[1, 2], [3, 4], [5, 6]])

# list comprehension will allow the best time complexity

# comprehension involving tuples

[x+y for x, y in [(1, 2), (3, 4), (5, 6)]]

# counting occurences using comprehensions
print(sum(
    1 for x in range(1000)
    if x % 2 == 0 and '9' in str(x)
))

# changing types in alist

items = ["1", "2", "3"]
numbers = [int(x) for x in items]

# iterate two lists 
list1 = [1, 2, 3]
list2 = [4, 5, 6]
result = [x + y for x, y in zip(list1, list2)]

