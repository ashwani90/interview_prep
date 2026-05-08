a,b,_ = 1,2,3

# Will not work (_ must to equal to remaining values )
a,b,_ = 1,2,3,4

# Both refer to same memory space
x = y = [1,2,4]
# or
x = [1,2,4]
y = x

# set items inside it must be hashable
a = {1, 2, 'test'}

# Hashable objects which compare equality must have the same hash value

# Simple conversion
a = 'hello'
list(a) # ['h', 'e', 'l', 'l', 'o']
set(a) # {'h', 'e', 'l', 'o'}
tuple(a) # ('h', 'e', 'l', 'l', 'o')

# Immutable data types
# int, long, float, complex
# str, bytes, tuple, frozenset

# mutable data types
# bytearray list set dict

names = ['Alice', 'Bob', 'Charlie']
names.append('David')
names.insert(1, 'Eve')

names.remove('Charlie')

names.index('David')
len(names)

names.count('Alice')
names.reverse() # or names[::-1]

names.pop()

# One member tuple
one_temp = 'o', # or tuple(['o'])

# loop through the dictionary keys
for k in state_caps.keys():
    print('{} is the capital of {}'.format(state_caps[k], k))

# convert list to set
set(names)

# defaultdict will never raise an KeyError any key that does not exist it gets the default value is returned
from collections import defaultdict
state_caps = defaultdict(str)
state_caps['California'] = 'Sacramento'
state_caps['Texas'] # Returns empty string (default value) since key doesn't exist

