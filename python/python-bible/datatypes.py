# Logical ops performed on boolean value
a = True
b = True

print(a and b)  # True
print(a or b)   # True
print(not a)    # False

# bool type is a subclass of int type so following operations are valid
issubclass(bool, int)  # True
isinstance(True, int)   # True

# Strings

# str: a unicode string type 'hello'
# bytes: byte string b'hello'

# reverse a string
a = 'hello'
reversed(a)

# Allowed in list but not in tuple
a = [1,2,3]
b[2] = 'Somethign else'