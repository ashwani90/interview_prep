# Design a State pattern system for an Order object (e.g., New → Paid → Shipped).

from abc import ABC, abstractmethod
from datetime import datetime
from typing import Optional

class OrderState(ABC):
    """Base state class for order states"""
    
    @abstractmethod
    def pay(self, order: 'Order') -> None:
        pass
    
    @abstractmethod
    def ship(self, order: 'Order') -> None:
        pass
    
    @abstractmethod
    def cancel(self, order: 'Order') -> None:
        pass
    
    @abstractmethod
    def complete(self, order: 'Order') -> None:
        pass
    
    def __str__(self) -> str:
        return self.__class__.__name__

class NewState(OrderState):
    """Initial state when order is created"""
    
    def pay(self, order: 'Order') -> None:
        print("Processing payment...")
        order.state = PaidState()
        order.payment_date = datetime.now()
    
    def ship(self, order: 'Order') -> None:
        print("Cannot ship unpaid order")
    
    def cancel(self, order: 'Order') -> None:
        print("Canceling new order")
        order.state = CanceledState()
    
    def complete(self, order: 'Order') -> None:
        print("Cannot complete unpaid order")

class PaidState(OrderState):
    """State after payment is received"""
    
    def pay(self, order: 'Order') -> None:
        print("Order already paid")
    
    def ship(self, order: 'Order') -> None:
        print("Shipping order...")
        order.state = ShippedState()
        order.shipment_date = datetime.now()
    
    def cancel(self, order: 'Order') -> None:
        print("Canceling paid order - issuing refund")
        order.state = CanceledState()
        order.refund_date = datetime.now()
    
    def complete(self, order: 'Order') -> None:
        print("Cannot complete order before shipping")

class ShippedState(OrderState):
    """State after order is shipped"""
    
    def pay(self, order: 'Order') -> None:
        print("Order already paid")
    
    def ship(self, order: 'Order') -> None:
        print("Order already shipped")
    
    def cancel(self, order: 'Order') -> None:
        print("Cannot cancel shipped order - initiate return instead")
    
    def complete(self, order: 'Order') -> None:
        print("Marking order as completed")
        order.state = CompletedState()
        order.completion_date = datetime.now()

class CanceledState(OrderState):
    """State when order is canceled"""
    
    def pay(self, order: 'Order') -> None:
        print("Cannot pay for canceled order")
    
    def ship(self, order: 'Order') -> None:
        print("Cannot ship canceled order")
    
    def cancel(self, order: 'Order') -> None:
        print("Order already canceled")
    
    def complete(self, order: 'Order') -> None:
        print("Cannot complete canceled order")

class CompletedState(OrderState):
    """Final state when order is completed"""
    
    def pay(self, order: 'Order') -> None:
        print("Order already completed")
    
    def ship(self, order: 'Order') -> None:
        print("Order already completed")
    
    def cancel(self, order: 'Order') -> None:
        print("Cannot cancel completed order")
    
    def complete(self, order: 'Order') -> None:
        print("Order already completed")

class Order:
    """Order class that delegates state-specific behavior to State objects"""
    
    def __init__(self, order_id: str):
        self.order_id = order_id
        self.state: OrderState = NewState()
        self.payment_date: Optional[datetime] = None
        self.shipment_date: Optional[datetime] = None
        self.completion_date: Optional[datetime] = None
        self.refund_date: Optional[datetime] = None
    
    def pay(self) -> None:
        """Pay for the order"""
        self.state.pay(self)
    
    def ship(self) -> None:
        """Ship the order"""
        self.state.ship(self)
    
    def cancel(self) -> None:
        """Cancel the order"""
        self.state.cancel(self)
    
    def complete(self) -> None:
        """Complete the order"""
        self.state.complete(self)
    
    def __str__(self) -> str:
        dates = [
            f"payment: {self.payment_date}",
            f"shipment: {self.shipment_date}",
            f"completion: {self.completion_date}",
            f"refund: {self.refund_date}"
        ]
        return (f"Order {self.order_id} ({self.state})\n"
                f"Dates: {', '.join(d for d in dates if 'None' not in d)}")


# Example usage
if __name__ == "__main__":
    print("=== Order Lifecycle ===")
    order = Order("ORD-1001")
    print(order)
    
    print("\n1. Paying order...")
    order.pay()
    print(order)
    
    print("\n2. Shipping order...")
    order.ship()
    print(order)
    
    print("\n3. Completing order...")
    order.complete()
    print(order)
    
    print("\n=== Alternative Path ===")
    order2 = Order("ORD-1002")
    print(order2)
    
    print("\n1. Trying to ship unpaid order...")
    order2.ship()
    
    print("\n2. Paying order...")
    order2.pay()
    
    print("\n3. Canceling paid order...")
    order2.cancel()
    print(order2)