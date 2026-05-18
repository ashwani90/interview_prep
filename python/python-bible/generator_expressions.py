# using generator expressions

(x**2 for x in range(10))

# or earlier versions
(x**2 for x in range(10))

# list comprehsions returns a list while generator expressions returns a generator

# so need to call .next() to iterate through it
# when values finished get StopIteration error

# Generator expressions are lazily evaluated
