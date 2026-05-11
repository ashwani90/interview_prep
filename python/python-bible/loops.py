# for loops can iterate on any iterable object that defines __getitem__ or a __iter__ function.
# __iter__ function returns an iterator which is an object with the next() method to access next element

# iertate through the list and get index as well
for index, item in enumerate(list_val):
    print(index, ':', item)

# Iterate over a list and also change the value inside the list using the map function
x = map(lambda item: item * 2, list_val)

# loops with an else clause
# else clause only executes after a for loop completes execution
for i  in range(2):
    print(i)
else:
    print("Done")


# it does not execute if the loop terminates some other way break or error
# for key in dict_ob is same as for key in dict_ob.keys()

