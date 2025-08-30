import threading
import queue
import time
import random

class ProducerConsumer:
    def __init__(self, max_size=5):
        self.queue = queue.Queue(maxsize=max_size)
        self.condition = threading.Condition()
        self.max_size = max_size
        self.shutdown_flag = False

    def producer(self, producer_id):
        """Producer thread function"""
        while not self.shutdown_flag:
            with self.condition:
                # Wait if queue is full
                while self.queue.full() and not self.shutdown_flag:
                    print(f"Producer {producer_id}: Queue full, waiting...")
                    self.condition.wait()
                
                if self.shutdown_flag:
                    break
                
                # Produce item
                item = random.randint(1, 100)
                self.queue.put(item)
                print(f"Producer {producer_id}: Produced {item}, queue size: {self.queue.qsize()}")
                
                # Notify consumers
                self.condition.notify_all()
            
            # Simulate work
            time.sleep(random.uniform(0.1, 0.5))

    def consumer(self, consumer_id):
        """Consumer thread function"""
        while not self.shutdown_flag:
            with self.condition:
                # Wait if queue is empty
                while self.queue.empty() and not self.shutdown_flag:
                    print(f"Consumer {consumer_id}: Queue empty, waiting...")
                    self.condition.wait()
                
                if self.shutdown_flag and self.queue.empty():
                    break
                
                # Consume item
                item = self.queue.get()
                print(f"Consumer {consumer_id}: Consumed {item}, queue size: {self.queue.qsize()}")
                
                # Notify producers
                self.condition.notify_all()
            
            # Simulate work
            time.sleep(random.uniform(0.2, 0.8))

    def shutdown(self):
        """Gracefully shutdown all threads"""
        with self.condition:
            self.shutdown_flag = True
            self.condition.notify_all()

def main():
    pc = ProducerConsumer(max_size=3)
    
    # Create and start producer threads
    producers = []
    for i in range(2):
        p = threading.Thread(target=pc.producer, args=(i+1,))
        p.start()
        producers.append(p)
    
    # Create and start consumer threads
    consumers = []
    for i in range(3):
        c = threading.Thread(target=pc.consumer, args=(i+1,))
        c.start()
        consumers.append(c)
    
    # Let the system run for a while
    try:
        time.sleep(5)
    except KeyboardInterrupt:
        pass
    finally:
        # Shutdown gracefully
        print("\nShutting down...")
        pc.shutdown()
        
        # Wait for threads to finish
        for p in producers:
            p.join()
        for c in consumers:
            c.join()
        
        print("All threads stopped")

if __name__ == "__main__":
    main()