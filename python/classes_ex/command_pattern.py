from abc import ABC, abstractmethod
from typing import List

class Command(ABC):
    @abstractmethod
    def execute(self):
        """Execute the command."""
        pass
    @abstractmethod
    def undo(self):
        """Undo the command."""
        pass
    
class Document:
    def __init__(self):
        self.content = ""
        self.font_size = 12
        self.font_name = "Arial"
    
    def add_text(self, text: str) -> None:
        self.content += text
    
    def delete_text(self, length: int) -> None:
        self.content = self.content[:-length]
    
    def set_font_size(self, size: int) -> None:
        self.font_size = size
    
    def set_font_name(self, name: str) -> None:
        self.font_name = name
    
    def __str__(self) -> str:
        return f"Document(content='{self.content}', font='{self.font_name} {self.font_size}pt')"
    
class AddTextCommand(Command):
    def __init__(self, document, text):
        self.document = document
        self.text = text
    
    def execute(self):
        self.document.add_text(self.text)
        
    def undo(self):
        self.document.delete_text(len(self.text))

class SetFontSizeCommand(Command):
    def __init__(self, document, size):
        self.document = document
        self.size = size
        self.previous_size = document.font_size
    
    def execute(self):
        self.document.set_font_size(self.size)
        
    def undo(self):
        self.document.set_font_size(self.previous_size)
    

class SetFontNameCommand(Command):
    def __init__(self, document, name):
        self.document = document
        self.name = name
        self.previous_name = document.font_name
    
    def execute(self):
        self.document.set_font_name(self.name)
        
    def undo(self):
        self.document.set_font_name(self.previous_name)
        
class CommandManager:
    def __init__(self):
        self.commands: List[Command] = []
        self.undo_stack: List[Command] = []
    
    def execute_command(self, command: Command):
        command.execute()
        self.commands.append(command)
        self.undo_stack.clear()
    
    def undo(self):
        if not self.commands:
            return
        command = self.commands.pop()
        command.undo()
        self.undo_stack.append(command)
    
    def redo(self):
        if not self.undo_stack:
            return
        command = self.undo_stack.pop()
        command.execute()
        self.commands.append(command)
        
    def queue_command(self, command: Command) -> None:
        """Adds a command to the queue without executing it"""
        self.command_history.append(command)
    
    def execute_queued_commands(self) -> None:
        """Executes all queued commands in order"""
        while self.command_history:
            command = self.command_history.pop(0)
            command.execute()
    
if __name__ == "__main__":
    # Create a document and command manager
    doc = Document()
    manager = CommandManager()

    # Execute some commands
    manager.execute_command(AddTextCommand(doc, "Hello, "))
    manager.execute_command(AddTextCommand(doc, "World!"))
    manager.execute_command(SetFontSizeCommand(doc, 14))
    manager.execute_command(SetFontSizeCommand(doc, "Times New Roman"))

    print("Current state:", doc)
    
    # Undo last command
    manager.undo()
    print("After undo:", doc)
    
    # Redo the undone command
    manager.redo()
    print("After redo:", doc)
    
    # Undo multiple commands
    manager.undo()  # font name
    manager.undo()  # font size
    print("After two more undos:", doc)
    
    # Queue commands without executing
    manager.queue_command(AddTextCommand(doc, " Welcome!"))
    manager.queue_command(SetFontNameCommand(doc, 16))
    
    # Execute queued commands
    manager.execute_queued_commands()
    print("After executing queued commands:", doc)