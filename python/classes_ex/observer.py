# Create an Observer pattern where listeners are notified of state changes.

from typing import List, Dict, Any, Protocol, runtime_checkable
from abc import ABC, abstractmethod
import logging

# Protocol for type checking (Python 3.8+)
@runtime_checkable
class Observer(Protocol):
    def update(self, subject: Any) -> None:
        """Called when the observed subject changes"""
        ...

class Subject:
    """The subject being observed"""
    
    def __init__(self):
        self._observers: List[Observer] = []
        self._state: Dict[str, Any] = {}
    
    def attach(self, observer: Observer) -> None:
        """Attach an observer to the subject"""
        if observer not in self._observers:
            self._observers.append(observer)
            logging.info(f"Attached observer: {observer.__class__.__name__}")
    
    def detach(self, observer: Observer) -> None:
        """Detach an observer from the subject"""
        try:
            self._observers.remove(observer)
            logging.info(f"Detached observer: {observer.__class__.__name__}")
        except ValueError:
            pass
    
    def notify(self) -> None:
        """Notify all observers about state changes"""
        logging.info("Notifying observers...")
        for observer in self._observers:
            observer.update(self)
    
    @property
    def state(self) -> Dict[str, Any]:
        """Get the current state"""
        return self._state.copy()
    
    @state.setter
    def state(self, new_state: Dict[str, Any]) -> None:
        """Set new state and notify observers"""
        changes = {k: v for k, v in new_state.items() 
                  if k not in self._state or self._state[k] != v}
        
        if changes:
            self._state.update(new_state)
            logging.info(f"State changed: {changes}")
            self.notify()

# Concrete Observer implementations
class EmailNotifier:
    def update(self, subject: Subject) -> None:
        state = subject.state
        if 'error' in state:
            print(f"[Email] System error: {state['error']}")
        elif 'status' in state and state['status'] == 'ready':
            print("[Email] System is ready for use")

class SMSNotifier:
    def update(self, subject: Subject) -> None:
        state = subject.state
        if 'priority' in state and state['priority'] > 5:
            print(f"[SMS] Priority alert ({state['priority']}): {state.get('message', '')}")

class LoggerObserver:
    def update(self, subject: Subject) -> None:
        print(f"[Logger] State update: {subject.state}")

# Example usage
if __name__ == "__main__":
    # Configure logging
    logging.basicConfig(level=logging.INFO)
    
    # Create subject
    system_monitor = Subject()
    
    # Create and attach observers
    email_notifier = EmailNotifier()
    sms_notifier = SMSNotifier()
    logger = LoggerObserver()
    
    system_monitor.attach(email_notifier)
    system_monitor.attach(sms_notifier)
    system_monitor.attach(logger)
    
    # Change state (triggers notifications)
    print("\n=== System startup ===")
    system_monitor.state = {'status': 'initializing', 'progress': 10}
    system_monitor.state = {'status': 'initializing', 'progress': 50}
    system_monitor.state = {'status': 'ready', 'progress': 100}
    
    print("\n=== System error ===")
    system_monitor.state = {'status': 'error', 'error': 'Disk full'}
    
    print("\n=== Priority alert ===")
    system_monitor.state = {'priority': 7, 'message': 'High load detected'}
    
    # Detach an observer
    system_monitor.detach(logger)
    print("\n=== After detaching logger ===")
    system_monitor.state = {'status': 'shutting down'}