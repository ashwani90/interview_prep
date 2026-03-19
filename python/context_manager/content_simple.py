class MyFile:
    def __init__(self, filename):
        self.filename = filename

    def __enter__(self):
        print("Opening file")
        self.file = open(self.filename, 'r')
        return self.file

    def __exit__(self, exc_type, exc_value, traceback):
        print("Closing file")
        self.file.close()


with MyFile("test.txt") as f:
    print(f.read())