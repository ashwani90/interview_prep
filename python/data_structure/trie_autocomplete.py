""""  
Create a trie supporting insertion, deletion, and auto-complete.

"""

class TrieNode:
    def __init__(self):
        self.children = {}  # Dictionary mapping characters to child nodes
        self.is_end_of_word = False  # Marks if this node completes a word
        self.word_count = 0  # Counts how many times this word was inserted

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word: str) -> None:
        """Insert a word into the trie"""
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
        node.word_count += 1
    
    def search(self, word: str) -> bool:
        """Check if a word exists in the trie"""
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word
    
    def starts_with(self, prefix: str) -> bool:
        """Check if any word in the trie starts with the given prefix"""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True
    
    def delete(self, word: str) -> bool:
        """Delete a word from the trie if it exists"""
        if not self.search(word):
            return False
        
        node = self.root
        stack = []
        
        # Traverse to the end of the word, keeping track of the path
        for char in word:
            stack.append((node, char))
            node = node.children[char]
        
        # Mark as not end of word and decrease count
        if node.word_count > 0:
            node.word_count -= 1
        
        # If this was the last occurrence, remove the end marker
        if node.word_count == 0:
            node.is_end_of_word = False
        
        # Clean up nodes with no children that aren't end of words
        while stack and not node.is_end_of_word and not node.children:
            parent_node, char = stack.pop()
            del parent_node.children[char]
            node = parent_node
        
        return True
    
    def auto_complete(self, prefix: str, max_suggestions: int = 5) -> list:
        """Return a list of auto-complete suggestions for the given prefix"""
        suggestions = []
        node = self.root
        
        # Traverse to the end of the prefix
        for char in prefix:
            if char not in node.children:
                return suggestions
            node = node.children[char]
        
        # Perform DFS to find all words with this prefix
        self._dfs_collect_words(node, prefix, suggestions, max_suggestions)
        return suggestions
    
    def _dfs_collect_words(self, node: TrieNode, current_prefix: str, 
                          suggestions: list, max_suggestions: int) -> None:
        """Depth-first search to collect words from the trie"""
        if len(suggestions) >= max_suggestions:
            return
        
        if node.is_end_of_word:
            suggestions.append((current_prefix, node.word_count))
        
        for char, child_node in sorted(node.children.items()):
            self._dfs_collect_words(child_node, current_prefix + char, 
                                  suggestions, max_suggestions)
    
    def display(self, node: TrieNode = None, prefix: str = "", indent: str = "") -> None:
        """Display the trie structure (for debugging)"""
        if node is None:
            node = self.root
        
        print(f"{indent}{prefix} {'*' if node.is_end_of_word else ''}")
        
        for char, child_node in sorted(node.children.items()):
            self.display(child_node, char, indent + "  ")

# Example usage
if __name__ == "__main__":
    trie = Trie()
    
    # Insert words
    words = ["apple", "app", "application", "banana", "ball", "bat", "batman"]
    for word in words:
        trie.insert(word)
    
    # Insert duplicates to test word_count
    trie.insert("apple")
    trie.insert("apple")
    trie.insert("app")
    
    print("Trie structure:")
    trie.display()
    
    # Search tests
    print("\nSearch results:")
    print("'app' exists:", trie.search("app"))        # True
    print("'apple' exists:", trie.search("apple"))    # True
    print("'apples' exists:", trie.search("apples"))  # False
    
    # Prefix tests
    print("\nPrefix checks:")
    print("Words starting with 'app':", trie.starts_with("app"))  # True
    print("Words starting with 'ba':", trie.starts_with("ba"))    # True
    print("Words starting with 'cat':", trie.starts_with("cat"))  # False
    
    # Auto-complete tests
    print("\nAuto-complete suggestions:")
    print("For 'app':", [word for word, _ in trie.auto_complete("app")])
    print("For 'ba':", [word for word, _ in trie.auto_complete("ba")])
    print("For 'b':", [word for word, _ in trie.auto_complete("b")])
    print("For 'x':", trie.auto_complete("x"))  # Empty
    
    # Deletion tests
    print("\nDeletion tests:")
    print("Delete 'apple':", trie.delete("apple"))  # True
    print("After delete - 'apple' exists:", trie.search("apple"))  # Still True (count was 3)
    print("Delete 'apple' two more times:", trie.delete("apple"), trie.delete("apple"))
    print("After deletes - 'apple' exists:", trie.search("apple"))  # False
    
    print("\nTrie structure after deletions:")
    trie.display()