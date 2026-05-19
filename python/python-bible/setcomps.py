{ x for x in range(10) }
# simple set comprehensions

{ch.lower() for ch in "Hello, World!"}

# usage of map related functions

filter(lambda x: x%2 ==0, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

map(lambda x: x**2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

reduce(lambda x, y: x + y, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

