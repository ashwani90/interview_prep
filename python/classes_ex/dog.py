# Create a Dog class with bark() and override it in a GermanShepherd subclass.

class Dog:
    
    def bark(self):
        print("A simple dog is barking")
        
class GermanShephard:
    def bark(self):
        print("Now a german shephard is barkling")
        
d = Dog()
d.bark()

gs = GermanShephard()
gs.bark()