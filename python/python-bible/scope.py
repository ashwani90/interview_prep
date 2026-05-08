# nonlocal keyword adds scope override to the inner scope

def counter():
    num = 0
    def increment():
        nonlocal num
        num += 1
        return num
    return increment