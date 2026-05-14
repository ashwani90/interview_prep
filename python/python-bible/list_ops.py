
# list can also be sorted using attrgetter and itemgetter
from operator import itemgetter, attrgetter

people = [{
    'name': 'Alice',
    'age': 30
}, {
    'name': 'Bob',
    'age': 25
}]

# this is mostly used in dict sorting
# this was the question asked in the interview
by_age = itemgetter('age')
people.sort(key=by_age)

# itemgetter can also be applied to the index
tuple_list = [(1, 'Alice'), (2, 'Bob')]
by_index = itemgetter(0)
tuple_list.sort(key=by_index)

# use attrgetter to sort by attributes of an object
by_name = attrgetter('name')
people.sort(key=by_name)

# replication of the list
l = ["blah"] * 3 # ["blah", "blah", "blah"]

a = list(range(10))
del a[::2] # [1,3,5,7,9]

# copying
b = a.copy() # creates a shallow copy of the list

# slicing using slice function
data = 'Hello, World!'
sliced_data = data[slice(0, 5)] # 'Hello'

# all function if all values in the list evaluate to True
all(l) 
any(l)
# only one return value

# reverse list
reversed(l)

# Concatenate and merge lists
merged = a + b 

# zip returns a list of tuples has ith tuple contains ith element 
alist = [1, 2, 3]
blist = [4, 5, 6]

for i,j in zip(alist, blist):
    print(i, j)

# output (1,4) (2,5) (3,6)

# for padding lists of unequal length to the longest one wiht None use itertools.zip_longest
clist = [3]
for i, j, k in itertools.zip_longest(alist, blist, clist, fillvalue=None):
    print(i, j, k)

