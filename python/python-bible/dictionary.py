#  make a shallow copy of a dictionary
dict_copy = {**dict_ob}

# update content with another dict and merge dicts
d = {**dict_ob, **other_dict}

# dict comprehension
d = {key: value for key, value in dict_ob.items()}

# delete an item from a dictionary
del dicte['newkey']

# Avoid key error exceptions
values = mydict.get('key', 'default_value')

# dictionary with default values
d.setdefault('and', []).append('this worked')

# as dict is unsorted keys(), values(), items() have no sort order

