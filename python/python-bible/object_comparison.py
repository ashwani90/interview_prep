class Foo(object):
    def __init__(self, value):
        self.value = value
    
    def __eq__(self, other):
        return self.value == other.value

A = Foo(5)
B = Foo(6)

A == B # False
A != B # True

# But different types of objects usage can lead to errors
C = Foo(5)
D = 5
C == D # False