d = OrderedDict()
d['first'] = 1
d['second'] = 2

for key in d:
    print(key, d[key])

# unpack dictionaries 
parrot(**d)

def parrot(first, second):
    pass

# can include trailing comma in dicts
# generate combinations of values

options = {
    "x": [1, 2],
    "y": [3, 4]
}

keys = options.keys()
values = options.values()

combinations = [dict(zip(keys, v)) for v in itertools.product(*values)]
print(combinations)

