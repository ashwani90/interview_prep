# Build a Bank system where multiple Customer objects hold multiple Account objects.

import uuid
from typing import Dict, List

class Account:
    def __init__(self, account_type: str, initial_balance: float = 0.0):
        """
        Initialize a bank account
        
        Args:
            account_type (str): Type of account (e.g., 'checking', 'savings')
            initial_balance (float): Starting balance (default 0.0)
        """
        self.account_id = str(uuid.uuid4())[:8]  # Generate unique 8-character ID
        self.account_type = account_type
        self.balance = initial_balance
        self.transaction_history = []
    
    def deposit(self, amount: float) -> bool:
        """Deposit money into the account"""
        if amount > 0:
            self.balance += amount
            self.transaction_history.append(f"Deposit: +${amount:.2f}")
            return True
        return False
    
    def withdraw(self, amount: float) -> bool:
        """Withdraw money from the account"""
        if 0 < amount <= self.balance:
            self.balance -= amount
            self.transaction_history.append(f"Withdrawal: -${amount:.2f}")
            return True
        return False
    
    def transfer(self, amount: float, target_account: 'Account') -> bool:
        """Transfer money to another account"""
        if self.withdraw(amount):
            target_account.deposit(amount)
            self.transaction_history.append(
                f"Transfer to {target_account.account_id}: -${amount:.2f}"
            )
            target_account.transaction_history.append(
                f"Transfer from {self.account_id}: +${amount:.2f}"
            )
            return True
        return False
    
    def get_balance(self) -> float:
        """Get current account balance"""
        return self.balance
    
    def get_transaction_history(self) -> List[str]:
        """Get list of transactions"""
        return self.transaction_history
    
    def __str__(self) -> str:
        return (f"Account {self.account_id} ({self.account_type}): "
                f"Balance ${self.balance:.2f}")


class Customer:
    def __init__(self, name: str, customer_id: str):
        """
        Initialize a bank customer
        
        Args:
            name (str): Customer's full name
            customer_id (str): Unique customer identifier
        """
        self.name = name
        self.customer_id = customer_id
        self.accounts: Dict[str, Account] = {}  # account_id: Account
    
    def open_account(self, account_type: str, initial_balance: float = 0.0) -> Account:
        """Open a new account for the customer"""
        new_account = Account(account_type, initial_balance)
        self.accounts[new_account.account_id] = new_account
        return new_account
    
    def close_account(self, account_id: str) -> bool:
        """Close an account (must have zero balance)"""
        if account_id in self.accounts:
            if self.accounts[account_id].get_balance() == 0:
                del self.accounts[account_id]
                return True
        return False
    
    def get_account(self, account_id: str) -> Account:
        """Get a specific account by ID"""
        return self.accounts.get(account_id)
    
    def get_total_balance(self) -> float:
        """Get the sum of all account balances"""
        return sum(account.get_balance() for account in self.accounts.values())
    
    def __str__(self) -> str:
        return (f"Customer {self.customer_id}: {self.name}\n"
                f"Accounts: {len(self.accounts)}, "
                f"Total Balance: ${self.get_total_balance():.2f}")


class Bank:
    def __init__(self, name: str):
        """
        Initialize a bank
        
        Args:
            name (str): Name of the bank
        """
        self.name = name
        self.customers: Dict[str, Customer] = {}  # customer_id: Customer
    
    def add_customer(self, name: str) -> Customer:
        """Add a new customer to the bank"""
        customer_id = str(uuid.uuid4())[:8]  # Generate unique 8-character ID
        new_customer = Customer(name, customer_id)
        self.customers[customer_id] = new_customer
        return new_customer
    
    def get_customer(self, customer_id: str) -> Customer:
        """Get a customer by ID"""
        return self.customers.get(customer_id)
    
    def transfer_between_customers(
        self,
        from_customer_id: str,
        from_account_id: str,
        to_customer_id: str,
        to_account_id: str,
        amount: float
    ) -> bool:
        """Transfer money between accounts of different customers"""
        from_customer = self.get_customer(from_customer_id)
        to_customer = self.get_customer(to_customer_id)
        
        if not from_customer or not to_customer:
            return False
            
        from_account = from_customer.get_account(from_account_id)
        to_account = to_customer.get_account(to_account_id)
        
        if not from_account or not to_account:
            return False
            
        return from_account.transfer(amount, to_account)
    
    def __str__(self) -> str:
        return (f"Bank: {self.name}\n"
                f"Customers: {len(self.customers)}, "
                f"Total Accounts: {sum(len(c.accounts) for c in self.customers.values())}")


# Example usage
if __name__ == "__main__":
    # Create a bank
    my_bank = Bank("Python Savings & Loan")
    print(my_bank)
    
    # Add customers
    alice = my_bank.add_customer("Alice Johnson")
    bob = my_bank.add_customer("Bob Smith")
    
    # Alice opens accounts
    alice_checking = alice.open_account("checking", 1000.0)
    alice_savings = alice.open_account("savings", 5000.0)
    
    # Bob opens accounts
    bob_checking = bob.open_account("checking", 750.0)
    
    print("\nAfter account creation:")
    print(f"- {alice}")
    print(f"- {bob}")
    
    # Perform transactions
    alice_checking.deposit(250.0)
    alice_savings.withdraw(1000.0)
    alice_savings.transfer(500.0, alice_checking)
    
    # Bank transfer between customers
    my_bank.transfer_between_customers(
        alice.customer_id,
        alice_checking.account_id,
        bob.customer_id,
        bob_checking.account_id,
        200.0
    )
    
    print("\nAfter transactions:")
    print(f"- Alice checking: ${alice_checking.get_balance():.2f}")
    print(f"- Alice savings: ${alice_savings.get_balance():.2f}")
    print(f"- Bob checking: ${bob_checking.get_balance():.2f}")
    
    print("\nAlice's checking transactions:")
    for transaction in alice_checking.get_transaction_history():
        print(f"  {transaction}")
    
    print("\nFinal bank status:")
    print(my_bank)