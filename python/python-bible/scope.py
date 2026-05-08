# nonlocal keyword adds scope override to the inner scope

def counter():
    num = 0
    def increment():
        nonlocal num
        num += 1
        return num
    return increment

# So this nonlocal keyword allows us to change the outer scope variable we can use it easily
# an assignment to global variable inside a local scope will overrider the same name variable
# global keyword tells program to use global declaration of the code

x = 'hi'
def change_global():
    global x
    x = 'hello'
    # Changes the global value
    print(x)

