class HistoryService {
    constructor() {
      this.undoStack = [];
      this.redoStack = [];
      this.maxStackSize = 100;
    }
  
    push(action) {
      this.undoStack.push(action);
      if (this.undoStack.length > this.maxStackSize) {
        this.undoStack.shift();
      }
      this.redoStack = []; // Clear redo stack when new action is performed
    }
  
    undo(currentState) {
      if (this.undoStack.length === 0) return currentState;
      
      const action = this.undoStack.pop();
      this.redoStack.push(action);
      
      return action.undo(currentState);
    }
  
    redo(currentState) {
      if (this.redoStack.length === 0) return currentState;
      
      const action = this.redoStack.pop();
      this.undoStack.push(action);
      
      return action.redo(currentState);
    }
  
    canUndo() {
      return this.undoStack.length > 0;
    }
  
    canRedo() {
      return this.redoStack.length > 0;
    }
  
    clear() {
      this.undoStack = [];
      this.redoStack = [];
    }
  }
  
  export const historyService = new HistoryService();