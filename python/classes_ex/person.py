# Define a Person class and create subclasses like Student and Teacher with extra fields.

class Person:
    def __init__(self, age, name):
        self.age = age
        self.name = name
        
    def print_name(self):
        print(self.name)
        
    def print_intro(self):
        print(self.name + " " + str(self.age))
        

class Student(Person):
    def __init__(self, age, name, standard):
        super().__init__(age, name)
        self.standard = standard
    def print_intro(self):
        print(self.name + " " + str(self.age) + " " + self.standard)
    
class Teacher(Person):
    def __init__(self, age, name, subject):
        super().__init__(age, name)
        self.subject = subject
    
    def print_intro(self):
        print(self.name + " " + str(self.age) + " " + self.subject)

p = Person(19, "Uio")

p.print_name()
p.print_intro()

s = Student(21, "Hon", "4")
s.print_intro()
s.print_name()

t = Teacher(34, "HYs", "5")
t.print_name()
t.print_intro()
