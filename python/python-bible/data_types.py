#  set data types

# sets are mutable and new elements can be added once sets are defined
basket = {'apple', 'banana', 'orange'}
print(basket)

# frozen sets - immutable and new elements cannot be added after its defined
b = frozenset('sdgasjgd')
print(b)

# dictionary data types
student = {'name': 'John', 'age': 20, 'grade': 'A'}
print(student)
print(student['name'])
print(student.values())
print(student.keys())

# tuple data types
tuple = (123, 456, 789)
tuple1 = ('world',)
print(tuple)
print(tuple[0])
print(tuple1)
print(tuple+tuple1)
# tuple1[1] = 'UP'  # This will raise an error because tuples are immutable

