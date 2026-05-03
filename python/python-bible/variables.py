a,b,_ = 1,2,3

# Will not work (_ must to equal to remaining values )
a,b,_ = 1,2,3,4

# Both refer to same memory space
x = y = [1,2,4]
# or
x = [1,2,4]
y = x

