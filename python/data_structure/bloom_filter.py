import mmh3  # MurmurHash3 - a good non-cryptographic hash function
from bitarray import bitarray

class BloomFilter:
    def __init__(self, size: int, hash_count: int):
        """
        Initialize a Bloom filter.
        
        Args:
            size: Number of bits in the bit array
            hash_count: Number of hash functions to use
        """
        self.size = size
        self.hash_count = hash_count
        self.bit_array = bitarray(size)
        self.bit_array.setall(False)
    
    def add(self, item: str) -> None:
        """Add an item to the Bloom filter"""
        for seed in range(self.hash_count):
            # Get the hash value
            index = mmh3.hash(item, seed) % self.size
            self.bit_array[index] = True
    
    def __contains__(self, item: str) -> bool:
        """Check if an item is probably in the Bloom filter"""
        for seed in range(self.hash_count):
            index = mmh3.hash(item, seed) % self.size
            if not self.bit_array[index]:
                return False
        return True  # Probably exists (with some false positive probability)

    def __repr__(self) -> str:
        """Return basic information about the Bloom filter"""
        return f"BloomFilter(size={self.size}, hash_count={self.hash_count})"

# Example usage
if __name__ == "__main__":
    # Install required packages if needed
    try:
        import mmh3
        from bitarray import bitarray
    except ImportError:
        print("Please install required packages:")
        print("pip install mmh3 bitarray")
        exit()

    # Create a Bloom filter with 1000 bits and 7 hash functions
    bf = BloomFilter(size=1000, hash_count=7)
    
    # Add some items
    words = ["apple", "banana", "cherry", "date", "elderberry"]
    for word in words:
        bf.add(word)
    
    # Test for membership
    test_words = words + ["fig", "grape", "kiwi"]
    print("Bloom Filter Membership Test:")
    for word in test_words:
        print(f"'{word}': {'Probably present' if word in bf else 'Definitely not present'}")
    
    # Calculate theoretical false positive probability
    n = len(words)
    m = bf.size
    k = bf.hash_count
    fp_prob = (1 - (1 - 1/m)**(k*n))**k
    print(f"\nEstimated false positive probability: {fp_prob:.4%}")