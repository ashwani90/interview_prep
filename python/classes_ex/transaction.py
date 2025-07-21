# Build a Transaction system where each object logs its status with timestamps.

import datetime
from enum import Enum, auto

class TransactionStatus(Enum):
    """Enumeration of possible transaction states"""
    CREATED = auto()
    PENDING = auto()
    PROCESSING = auto()
    COMPLETED = auto()
    FAILED = auto()
    CANCELLED = auto()

class Transaction:
    def __init__(self, transaction_id: str, amount: float, description: str = ""):
        """
        Initialize a new transaction
        
        Args:
            transaction_id: Unique identifier for the transaction
            amount: Monetary amount of the transaction
            description: Optional description of the transaction
        """
        self.transaction_id = transaction_id
        self.amount = amount
        self.description = description
        self._status_log = []
        self._current_status = None
        self._update_status(TransactionStatus.CREATED)
    
    def _update_status(self, new_status: TransactionStatus):
        """Internal method to update status with timestamp"""
        timestamp = datetime.datetime.now(datetime.timezone.utc)
        log_entry = {
            'timestamp': timestamp,
            'status': new_status,
            'message': f"Status changed to {new_status.name}"
        }
        self._status_log.append(log_entry)
        self._current_status = new_status
    
    def begin_processing(self):
        """Mark transaction as processing"""
        if self._current_status not in [TransactionStatus.CREATED, TransactionStatus.PENDING]:
            raise ValueError(f"Cannot process from {self._current_status.name} state")
        self._update_status(TransactionStatus.PROCESSING)
    
    def complete(self):
        """Mark transaction as completed"""
        if self._current_status != TransactionStatus.PROCESSING:
            raise ValueError("Transaction must be processing before completion")
        self._update_status(TransactionStatus.COMPLETED)
    
    def fail(self, reason: str = ""):
        """Mark transaction as failed with optional reason"""
        if self._current_status != TransactionStatus.PROCESSING:
            raise ValueError("Transaction must be processing before failing")
        self._update_status(TransactionStatus.FAILED)
        if reason:
            self.add_note(f"Failure reason: {reason}")
    
    def cancel(self, reason: str = ""):
        """Cancel the transaction with optional reason"""
        if self._current_status not in [TransactionStatus.CREATED, TransactionStatus.PENDING]:
            raise ValueError(f"Cannot cancel from {self._current_status.name} state")
        self._update_status(TransactionStatus.CANCELLED)
        if reason:
            self.add_note(f"Cancellation reason: {reason}")
    
    def add_note(self, message: str):
        """Add a custom note to the transaction log"""
        timestamp = datetime.datetime.now(datetime.timezone.utc)
        self._status_log.append({
            'timestamp': timestamp,
            'message': message
        })
    
    def get_status_history(self):
        """Return complete status history"""
        return self._status_log.copy()
    
    def get_current_status(self):
        """Get the current status of the transaction"""
        return self._current_status
    
    def __str__(self):
        """Human-readable string representation"""
        return (f"Transaction {self.transaction_id}: "
                f"Amount: {self.amount:.2f}, "
                f"Status: {self._current_status.name}")
    
    def print_history(self):
        """Print the complete transaction history"""
        print(f"\nTransaction History for {self.transaction_id}")
        print("-" * 50)
        for entry in self._status_log:
            timestamp = entry['timestamp'].strftime("%Y-%m-%d %H:%M:%S %Z")
            if 'status' in entry:
                print(f"{timestamp} - STATUS: {entry['status'].name}")
            if 'message' in entry:
                print(f"{timestamp} - NOTE: {entry['message']}")


# Example usage
if __name__ == "__main__":
    # Create a new transaction
    t1 = Transaction("T1001", 125.50, "Online purchase")
    print(t1)
    
    # Process the transaction
    t1.begin_processing()
    t1.add_note("Payment processor notified")
    
    # Complete the transaction
    t1.complete()
    t1.add_note("Customer notified of completion")
    
    # Print history
    t1.print_history()
    
    # Create and cancel a transaction
    t2 = Transaction("T1002", 89.99, "Subscription")
    t2.cancel("Customer changed mind")
    print(f"\n{t2}")
    t2.print_history()
    
    # Create and fail a transaction
    t3 = Transaction("T1003", 45.00, "Service fee")
    t3.begin_processing()
    t3.fail("Insufficient funds")
    print(f"\n{t3}")
    t3.print_history()