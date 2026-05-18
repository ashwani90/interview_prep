# Dictionary comprehensions

{x: x**2 for x in range(10)}
# or

{name: len(name) for name in ["Alice", "Bob", "Charlie"]}

# using as a key value pair

{key: value for key, value in inti_dict.items() if key == 'x'} 

# merging dictionaries using this
dict1 = {x: x**2 for x in range(5)}
dict2 = {x: x**3 for x in range(5, 10)}

{k: v for d in [dict1, dict2] for k, v in d.items()}

# list comprehensions with nested loop
output = [element for e in [[1, 2], [3, 4]] for element in e]

