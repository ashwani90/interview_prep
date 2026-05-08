name = raw_input("What is your name?")
# Out: What is your name?

print(name) # prints user input sent

# Built in modules and Functions
# Module is file containing Python definitions and statements. 
print(pow(2, 3))

# print info of the function
help(max)

import math
math.sqrt(16)

# Create a module that is just a file containing the function

def say_hello():
    print("Hello, World!")

# import hello file name
# print(hello.say_hello())

# str and repr function differences

# repr(x) - returns the string representation of an object that is unambiguous and ideally could be used to recreate the object using eval function
# calls x.__repr__()

# str(x) - returns the string representation of an object that is readable for end users
