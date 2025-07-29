"""
    Simulate a real-time chat server where each `User` is a class and messages are routed between them.
"""

from typing import Dict, List, Optional
import threading
import time
import uuid

class Message:
    def __init__(self, sender, content, timestamp):
        self.id = str(uuid.uuid4())
        self.sender = sender
        self.content = content
        self.timestamp = timestamp
    
    def __str__(self):
        return f"[{time.ctime(self.timestamp)}] {self.sender.username}: {self.content}"
    
class User:
    def __init__(self, username, server):
        self.username = username
        self.server = server
        self._inbox = []
        self._inbox_lock = threading.Lock()

    def send_message(self, recipient_username, content):
        self.server.route_message(self, recipient_username, content)
    
    def receive_message(self, message):
        with self._inbox_lock:
            self._inbox.append(message)
    
    def check_messages(self):
        with self._inbox_lock:
            messages = self._inbox.copy()
            self._inbox.clear()
        return messages

    def __repr__(self):
        return f"User(username={self.username})"
    
class ChatServer:
    def __init__(self):
        self.users: Dict[str, User] = {}
        self.lock = threading.Lock()
        
    def register_user(self, username):
        with self.lock:
            if username in self.users:
                raise None
            user = User(username, self)
            self.users[username] = user
            return user
    def route_message(self, sender: User, recipient_username: str, content: str):
        """Route a message from sender to recipient"""
        with self.lock:
            recipient = self.users.get(recipient_username)
        
        if recipient is None:
            print(f"Server: User '{recipient_username}' not found. Message not delivered.")
            return
        
        message = Message(sender, content)
        recipient.receive_message(message)
        print(f"Server: Message routed from {sender.username} to {recipient.username}")
    
    def broadcast_message(self, sender: User, content: str):
        """Send a message to all users"""
        message = Message(sender, content)
        with self.lock:
            for username, user in self.users.items():
                if user != sender:
                    user.receive_message(message)
        print(f"Server: Broadcast message from {sender.username} to all users")

def simulate_user_activity(user: User, recipients: List[str], server: ChatServer):
    """Simulate a user sending messages periodically"""
    for i in range(3):
        for recipient in recipients:
            if recipient != user.username:
                message_content = f"Hello {recipient}! This is message #{i+1}"
                user.send_message(recipient, message_content)
                time.sleep(0.5)
        
        # Also send a broadcast message
        user.send_message("all", f"Hey everyone! Broadcast message #{i+1}")
        time.sleep(1)
        
        # Check for new messages
        messages = user.check_messages()
        for msg in messages:
            print(f"{user.username} received: {msg}")

if __name__ == "__main__":
    # Create a chat server
    server = ChatServer()
    
    # Register users
    alice = server.register_user("Alice")
    bob = server.register_user("Bob")
    charlie = server.register_user("Charlie")
    
    # Verify registration
    print("Registered users:", list(server.users.keys()))
    
    # Create threads to simulate concurrent user activity
    threads = []
    for user in [alice, bob, charlie]:
        recipients = ["Alice", "Bob", "Charlie"]
        t = threading.Thread(
            target=simulate_user_activity,
            args=(user, recipients, server)
        )
        threads.append(t)
        t.start()
    
    # Wait for all threads to complete
    for t in threads:
        t.join()
    
    print("Chat simulation complete.")