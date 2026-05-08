# ops on sets

# Intersections

{1, 2, 3} & {3, 4, 5}
{1, 2, 3}.intersection({3, 4, 5})

# Union
{1, 2, 3} | {3, 4, 5}
{1, 2, 3}.union({3, 4, 5})

# Difference
{1, 2, 3} - {3, 4, 5}
{1, 2, 3}.difference({3, 4, 5})

# Symmetric Difference
{1, 2, 3} ^ {3, 4, 5}
{1, 2, 3}.symmetric_difference({3, 4, 5})

# subset check
{1, 2, 3} <= {1, 2, 3, 4, 5}
{1, 2, 3}.issubset({1, 2, 3, 4, 5})

# superset check
{1, 2, 3} >= {1, 2, 3, 4, 5}
{1, 2, 3}.issuperset({1, 2, 3, 4, 5})

# Disjoint check
{1, 2, 3}.isdisjoint({4, 5, 6})
{1}.isdisjoint({4, 5, 6})

# Add and remove
{1, 2, 3}.add(4)
{1, 2, 3}.remove(2)
{1,2,3}.discard(3)

from collections import Counter
counterA = Counter([1, 2, 2, 3, 3, 3])
print(counterA)

# Counter dict elements stored as dict keys and counts stored as dict values, an unordered collection