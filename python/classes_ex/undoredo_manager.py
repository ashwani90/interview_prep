from abc import ABC, abstractmethod
from typing import List, Optional

class Command(ABC):
    """Abstract base class for commands"""
    @abstractmethod
    def execute(self) -> None:
        pass
    
    @abstractmethod
    def undo(self) -> None:
        pass

class UndoRedoManager:
    """Manages undo and redo operations using a command pattern"""
    def __init__(self):
        self._undo_stack: List[Command] = []
        self._redo_stack: List[Command] = []
        self._max_stack_size = 100  # Prevent memory issues
    
    def execute(self, command: Command) -> None:
        """Execute a new command and add it to the undo stack"""
        command.execute()
        self._undo_stack.append(command)
        
        # Clear redo stack when a new command is executed
        self._redo_stack.clear()
        
        # Enforce maximum stack size
        if len(self._undo_stack) > self._max_stack_size:
            self._undo_stack.pop(0)
    
    def undo(self) -> None:
        """Undo the last command"""
        if not self._undo_stack:
            return
            
        command = self._undo_stack.pop()
        command.undo()
        self._redo_stack.append(command)
    
    def redo(self) -> None:
        """Redo the last undone command"""
        if not self._redo_stack:
            return
            
        command = self._redo_stack.pop()
        command.execute()
        self._undo_stack.append(command)
    
    def can_undo(self) -> bool:
        """Check if undo is possible"""
        return len(self._undo_stack) > 0
    
    def can_redo(self) -> bool:
        """Check if redo is possible"""
        return len(self._redo_stack) > 0
    
    def clear(self) -> None:
        """Clear both undo and redo stacks"""
        self._undo_stack.clear()
        self._redo_stack.clear()
    
    def get_history(self) -> List[str]:
        """Get a list of command names in history"""
        return [cmd.__class__.__name__ for cmd in self._undo_stack]
    
    def get_redo_history(self) -> List[str]:
        """Get a list of command names available for redo"""
        return [cmd.__class__.__name__ for cmd in self._redo_stack]

# Example Concrete Commands
class AddTextCommand(Command):
    """Concrete command for adding text"""
    def __init__(self, document: 'Document', text: str):
        self.document = document
        self.text = text
    
    def execute(self) -> None:
        self.document.add_text(self.text)
    
    def undo(self) -> None:
        self.document.delete_text(len(self.text))
    
    def __str__(self) -> str:
        return f"AddTextCommand(text='{self.text}')"

class DeleteTextCommand(Command):
    """Concrete command for deleting text"""
    def __init__(self, document: 'Document', position: int, length: int):
        self.document = document
        self.position = position
        self.length = length
        self.deleted_text = ""
    
    def execute(self) -> None:
        self.deleted_text = self.document.get_text()[self.position:self.position+self.length]
        self.document.delete_text_range(self.position, self.length)
    
    def undo(self) -> None:
        self.document.insert_text(self.position, self.deleted_text)
    
    def __str__(self) -> str:
        return f"DeleteTextCommand(pos={self.position}, len={self.length})"

class Document:
    """Simple document class for demonstration"""
    def __init__(self):
        self.content = ""
    
    def add_text(self, text: str) -> None:
        self.content += text
    
    def delete_text(self, length: int) -> None:
        self.content = self.content[:-length]
    
    def delete_text_range(self, position: int, length: int) -> None:
        self.content = self.content[:position] + self.content[position+length:]
    
    def insert_text(self, position: int, text: str) -> None:
        self.content = self.content[:position] + text + self.content[position:]
    
    def get_text(self) -> str:
        return self.content
    
    def __str__(self) -> str:
        return self.content

# Example usage
if __name__ == "__main__":
    # Create components
    doc = Document()
    manager = UndoRedoManager()
    
    # Execute some commands
    print("Executing commands...")
    manager.execute(AddTextCommand(doc, "Hello "))
    manager.execute(AddTextCommand(doc, "World!"))
    print("Document:", doc)
    
    # Undo last command
    print("\nUndoing last command...")
    manager.undo()
    print("Document:", doc)
    print("Can undo:", manager.can_undo())
    print("Can redo:", manager.can_redo())
    
    # Redo the undone command
    print("\nRedoing...")
    manager.redo()
    print("Document:", doc)
    
    # Execute a more complex command
    print("\nExecuting delete command...")
    manager.execute(DeleteTextCommand(doc, 5, 6))  # Delete "World!"
    print("Document:", doc)
    
    # Undo the deletion
    print("\nUndoing deletion...")
    manager.undo()
    print("Document:", doc)
    
    # Show history
    print("\nCommand History:")
    print("Undo stack:", manager.get_history())
    print("Redo stack:", manager.get_redo_history())
    
    # Clear history
    print("\nClearing history...")
    manager.clear()
    print("Can undo:", manager.can_undo())
    print("Can redo:", manager.can_redo())