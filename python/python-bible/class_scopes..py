# Funcition skip class scope when looking up names

# classes have local scope during definition but functions skip that scope when looking up names
# as lambdas are functions and comprehension use functions this can lead to some surprising behaviour

a = 'global'

class Fred:
    a = 'class' # class scope
    b = [a for i in range(5)]
    c = [a for i in range(5)]
    d = a
    e = lambda: a 
    f = lambda a=a: a # default argument use class scopes

    @staticmethod
    def g(): # function scope
        return a
    
print(Fred.a)
print(next(Fred.b))
print(Fred.c[0])
print(Fred.d)
print(Fred.e())
print(Fred.f())
print(Fred.g())