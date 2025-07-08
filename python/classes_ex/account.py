# Define a BankAccount class with deposit and withdraw methods and balance tracking.
class BankAccount:
    
    def __init__(self):
        self.balance = 0

    def deposit(self, val):
        return self.balance + val 
    
    def withdraw(self, val):
        return self.balance - val
