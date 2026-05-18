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

