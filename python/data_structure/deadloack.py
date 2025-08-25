from collections import defaultdict
from typing import Dict, List, Set, Tuple

class DeadlockDetector:
    def __init__(self):
        self.wait_for_graph = defaultdict(set)  # {process: set(resources)}
        self.resource_owners = {}               # {resource: process}
        self.processes = set()

    def add_process(self, process_id: str):
        """Register a new process"""
        self.processes.add(process_id)
        if process_id not in self.wait_for_graph:
            self.wait_for_graph[process_id] = set()

    def request_resource(self, process_id: str, resource_id: str):
        """
        Record a resource request.
        Returns True if this request causes a deadlock.
        """
        if resource_id in self.resource_owners:
            owner = self.resource_owners[resource_id]
            if owner != process_id:  # Process can't wait for itself
                self.wait_for_graph[process_id].add(owner)
                return self._detect_deadlock(process_id)
        else:
            # Resource is available, grant it immediately
            self.resource_owners[resource_id] = process_id
        return False

    def release_resource(self, process_id: str, resource_id: str):
        """Release a resource and update the wait-for graph"""
        if resource_id in self.resource_owners and self.resource_owners[resource_id] == process_id:
            del self.resource_owners[resource_id]
            # Remove any wait edges that were waiting for this resource
            for p in self.wait_for_graph:
                if process_id in self.wait_for_graph[p]:
                    self.wait_for_graph[p].remove(process_id)

    def _detect_deadlock(self, initiating_process: str) -> bool:
        """Check for cycles in the wait-for graph using DFS"""
        visited = set()
        recursion_stack = set()

        def dfs(process):
            if process in recursion_stack:
                return True  # Cycle detected
            if process in visited:
                return False

            visited.add(process)
            recursion_stack.add(process)

            for neighbor in self.wait_for_graph[process]:
                if dfs(neighbor):
                    return True

            recursion_stack.remove(process)
            return False

        return dfs(initiating_process)

    def get_wait_for_graph(self) -> Dict[str, Set[str]]:
        """Return the current wait-for graph"""
        return {k: v for k, v in self.wait_for_graph.items() if v}

    def visualize_graph(self):
        """Print an ASCII representation of the wait-for graph"""
        print("Wait-for Graph:")
        for process, waits_for in self.get_wait_for_graph().items():
            for resource_owner in waits_for:
                print(f"{process} -> {resource_owner}")

# Example usage with deadlock scenario
def simulate_deadlock():
    print("=== Deadlock Simulation ===")
    detector = DeadlockDetector()
    
    # Create processes
    for p in ['P1', 'P2', 'P3']:
        detector.add_process(p)
    
    # P1 holds R1, P2 holds R2
    detector.resource_owners = {'R1': 'P1', 'R2': 'P2'}
    
    # P1 requests R2 (held by P2)
    print("P1 requests R2 (held by P2)")
    deadlock = detector.request_resource('P1', 'R2')
    print(f"Deadlock detected: {deadlock}")
    detector.visualize_graph()
    
    # P2 requests R3 (not held by anyone)
    print("\nP2 requests R3 (available)")
    deadlock = detector.request_resource('P2', 'R3')
    print(f"Deadlock detected: {deadlock}")
    detector.visualize_graph()
    
    # P3 requests R1 (held by P1)
    print("\nP3 requests R1 (held by P1)")
    deadlock = detector.request_resource('P3', 'R1')
    print(f"Deadlock detected: {deadlock}")
    detector.visualize_graph()
    
    # Now create a cycle: P2 requests R3 (but P3 now holds R3)
    print("\nUpdating scenario - P3 now holds R3")
    detector.resource_owners['R3'] = 'P3'
    
    print("P2 requests R3 (held by P3)")
    deadlock = detector.request_resource('P2', 'R3')
    print(f"Deadlock detected: {deadlock}")
    detector.visualize_graph()
    
    # Show the complete cycle
    print("\nComplete cycle:")
    print("P1 -> P2 (P1 waits for P2)")
    print("P2 -> P3 (P2 waits for P3)")
    print("P3 -> P1 (P3 waits for P1)")

# Example usage without deadlock
def simulate_no_deadlock():
    print("\n=== No Deadlock Simulation ===")
    detector = DeadlockDetector()
    
    for p in ['P1', 'P2']:
        detector.add_process(p)
    
    # P1 holds R1
    detector.resource_owners = {'R1': 'P1'}
    
    # P2 requests R1 (held by P1)
    print("P2 requests R1 (held by P1)")
    deadlock = detector.request_resource('P2', 'R1')
    print(f"Deadlock detected: {deadlock}")
    detector.visualize_graph()
    
    # P1 releases R1
    print("\nP1 releases R1")
    detector.release_resource('P1', 'R1')
    
    # Now P2 can get R1
    print("P2 requests R1 again (now available)")
    deadlock = detector.request_resource('P2', 'R1')
    print(f"Deadlock detected: {deadlock}")
    detector.visualize_graph()

if __name__ == "__main__":
    simulate_deadlock()
    simulate_no_deadlock()