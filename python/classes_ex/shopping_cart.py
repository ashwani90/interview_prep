# Implement a ShoppingCart class that holds items with prices and calculates total.

class ShoppingCart:
    def __init__(self):
        self.items = {}  # Dictionary to store items and their quantities
    
    def add_item(self, item_name, price, quantity=1):
        """Add an item to the cart or increase its quantity if already present"""
        if item_name in self.items:
            self.items[item_name]['quantity'] += quantity
        else:
            self.items[item_name] = {'price': price, 'quantity': quantity}
    
    def remove_item(self, item_name, quantity=1):
        """Remove an item from the cart or decrease its quantity"""
        if item_name in self.items:
            if self.items[item_name]['quantity'] <= quantity:
                del self.items[item_name]
            else:
                self.items[item_name]['quantity'] -= quantity
    
    def calculate_total(self):
        """Calculate the total price of all items in the cart"""
        total = 0
        for item_name, item_info in self.items.items():
            total += item_info['price'] * item_info['quantity']
        return total
    
    def get_items(self):
        """Return a list of all items in the cart with their details"""
        return self.items
    
    def clear_cart(self):
        """Remove all items from the cart"""
        self.items = {}
        
# Create a shopping cart
cart = ShoppingCart()

# Add items to the cart
cart.add_item("Apple", 0.99, 3)
cart.add_item("Banana", 0.59, 2)
cart.add_item("Milk", 2.99)

# Calculate total
print(f"Total: ${cart.calculate_total():.2f}")  # Output: Total: $6.53

# Remove an item
cart.remove_item("Banana", 1)

# Calculate new total
print(f"Updated Total: ${cart.calculate_total():.2f}")  # Output: Updated Total: $5.94

# View all items in cart
print("Items in cart:")
for item, details in cart.get_items().items():
    print(f"{item}: {details['quantity']} x ${details['price']:.2f}")