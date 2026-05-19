class Node:
    def __init__(self, val):
        self.data = val 
        self.next = None
    
    def getData(self):
        return self.data

    def getNext(self):
        return self.next

    def setData(self, val):
        self.data = val
    
    def setNext(self, next_node):
        self.next = next_node

class LinkedList:
    def __init__(self):
        self.head = None
    
    def isEmpty(self):
        return self.head == None
    
    def add(self, item):
        new_node = Node(item)
        new_node.setNext(new_node)
        self.head = new_node
    
    def size(self):
        count = 0
        current = self.head
        while current is not None:
            count += 1
            current = current.getNext()
        return count
    
    def search(self, item):
        current = self.head
        found = False
        while current is not None and not found:
            if current.getData() == item:
                found = True
            else:
                current = current.getNext()
        return found
    
    def remove(self, item):
        current = self.head
        previous = None
        found = False
        while current is not None and not found:
            if current.getData() == item:
                found = True
            else:
                previous = current
                current = current.getNext()
        if found:
            if previous is not None:
                self.head = current.getNext()
            else:
                previous.setNext(current.getNext())

        else:
            raise ValueError
            print("Item not found in the list")
    
    def insert(self, pos, item):
        