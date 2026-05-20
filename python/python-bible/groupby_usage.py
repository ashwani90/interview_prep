things = [('animal', 'cat'), ('animal', 'dog'), ('fruit', 'apple'), ('fruit', 'banana')]

dic = {}
f = lambda x: x[0]

for key, group in groupby(sorted(things, key=f), key=f):
    dic[key] = list(group)

print(dic)
