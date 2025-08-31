""" 
LRU cache using collections.OrderedDict.
"""


class ListNode:
    """" Node as a doubly linked list """
    def __init__(self, key=None, value=None):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None
    
class LRUCache:
    def __init__(self, capacity):
        if capacity <= 0:
            raise ValueError("Capacity must be greater than 0")
        self.capacity = capacity
        self.cache = {}
        self.size = 0
        
        self.head = ListNode()  # Dummy head
        self.tail = ListNode()
        self.head.next = self.tail
        self.tail.prev = self.head
        
    
    def __move_to_front(self, node):
        self._remove_node(node)
        self._add_to_front(node)
        
    def _remove_node(self, node):
        """ Remove a node from the linked list """
        prev_node = node.prev
        next_node = node.next 
        prev_node.next = next_node
        next_node.prev = prev_node
        
    def _move_to_front(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node
        
    def __evict(self):
        if self.size == 0:
            return

        lru_node = self.tail.prev
        self._remove_node(lru_node)
        del self.cache[lru_node.key]
        self.size -= 1
        
    def get(self, key):
        if key not in self.cache:
            return -1
        
        node = self.cache[key]
        self.__move_to_front(node)
        return node.value
    
    
    def put(self, key, value) -> None:
        """Add/update a key-value pair"""
        if key in self.cache:
            # Update existing value
            node = self.cache[key]
            node.value = value
            self.__move_to_front(node)
        else:
            # Add new entry
            if self.size >= self.capacity:
                self.__evict()
            
            new_node = ListNode(key, value)
            self.cache[key] = new_node
            self.__add_to_front(new_node)
            self.size += 1
    
    def __contains__(self, key) -> bool:
        return key in self.cache
    
    def __len__(self) -> int:
        return self.size
    
    def clear(self) -> None:
        """Clear the cache"""
        self.cache.clear()
        self.size = 0
        # Reset dummy nodes
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def get_all_items(self) -> list:
        """Get all items in order from most to least recent"""
        items = []
        current = self.head.next
        while current != self.tail:
            items.append((current.key, current.value))
            current = current.next
        return items

if __name__ == "__main__":
    cache = LRUCache(3)
    
    # Insert some items
    cache.put("a", 1)
    cache.put("b", 2)
    cache.put("c", 3)
    print("Initial cache (most to least recent):", cache.get_all_items())
    
    # Access an item to make it most recent
    print("\nAccessing 'b':", cache.get("b"))
    print("After access:", cache.get_all_items())
    
    # Add new item, which will evict least recent ('a')
    cache.put("d", 4)
    print("\nAfter adding 'd':", cache.get_all_items())
    
    # Update existing item
    cache.put("c", 33)
    print("\nAfter updating 'c':", cache.get_all_items())
    
    # Check cache operations
    print("\nCache contains 'b'?", "b" in cache)
    print("Cache contains 'a'?", "a" in cache)
    print("Current cache size:", len(cache))
    
    # Clear cache
    cache.clear()
    print("\nAfter clear:", cache.get_all_items())