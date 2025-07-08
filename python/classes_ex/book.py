# Create a Book class with title, author, and pages, and print book details.

class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages
        
    def print_details(self):
        print("Print all the details")
        
        
book = Book()
book.print_details()