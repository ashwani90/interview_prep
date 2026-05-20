names = ['Fred', 'Wilma', 'Barney']
def long_name(name):
 return len(name) > 5

filter(long_name, names)

# compehension equivalent

[name for name in names if len(name) > 5]

# if function is not used then identity function will be used
list(filter(None, names))

# empty names will be filtered out

from itertools import filterfalse

list(filterfalse(None, names))
# empty things will be removed

