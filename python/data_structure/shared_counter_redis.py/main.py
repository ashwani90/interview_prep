import redis
import random
from typing import List

class ShardedCounter:
    def __init__(self, redis_host: str = 'localhost', redis_port: int = 6379, 
                 shard_count: int = 5, counter_name: str = 'sharded_counter'):
        """
        Initialize a sharded counter.
        
        Args:
            redis_host: Redis server host
            redis_port: Redis server port
            shard_count: Number of shards to distribute the counter
            counter_name: Base name for Redis keys
        """
        self.redis = redis.Redis(host=redis_host, port=redis_port)
        self.shard_count = shard_count
        self.counter_name = counter_name
        self.shard_keys = [f"{counter_name}:shard_{i}" for i in range(shard_count)]
        
        # Initialize all shards to 0
        for key in self.shard_keys:
            self.redis.set(key, 0)

    def increment(self, amount: int = 1) -> None:
        """Increment the counter by selecting a random shard"""
        shard_key = random.choice(self.shard_keys)
        self.redis.incrby(shard_key, amount)

    def decrement(self, amount: int = 1) -> None:
        """Decrement the counter by selecting a random shard"""
        shard_key = random.choice(self.shard_keys)
        self.redis.decrby(shard_key, amount)

    def get_total(self) -> int:
        """Get the total count by summing all shards"""
        total = 0
        for key in self.shard_keys:
            val = self.redis.get(key)
            total += int(val) if val else 0
        return total

    def get_shard_values(self) -> List[int]:
        """Get the current value of each shard"""
        return [int(self.redis.get(key) or 0 for key in self.shard_keys]

    def reset(self) -> None:
        """Reset all shards to 0"""
        for key in self.shard_keys:
            self.redis.set(key, 0)

# Example usage
if __name__ == "__main__":
    # Connect to Redis (make sure Redis server is running)
    counter = ShardedCounter(shard_count=3)
    
    print("Initial state:")
    print("Shard values:", counter.get_shard_values())
    print("Total:", counter.get_total())
    
    # Increment the counter
    print("\nIncrementing...")
    for _ in range(10):
        counter.increment()
        print(f"After increment: {counter.get_shard_values()} (Total: {counter.get_total()})")
    
    # Decrement the counter
    print("\nDecrementing...")
    for _ in range(5):
        counter.decrement()
        print(f"After decrement: {counter.get_shard_values()} (Total: {counter.get_total()})")
    
    # Bulk operations
    print("\nBulk operations:")
    counter.increment(5)
    print(f"After bulk increment: {counter.get_shard_values()} (Total: {counter.get_total()})")
    
    # Reset
    print("\nResetting counter...")
    counter.reset()
    print("Shard values after reset:", counter.get_shard_values())