import schedule
import time
from threading import Thread
from datetime import datetime, timedelta
from typing import Callable, Union

class JobScheduler:
    def __init__(self):
        self.jobs = []
        self._running = False
        self._thread = None

    def add_job(
        self,
        task: Callable,
        schedule_str: str = None,
        *,
        every: int = None,
        unit: str = None,
        at: str = None,
        cron: str = None
    ) -> None:
        """
        Add a job to the scheduler with various scheduling options.
        
        Args:
            task: Callable to execute
            schedule_str: Simple schedule string (e.g., "every 10 minutes")
            every: Interval value (e.g., 10)
            unit: Interval unit (e.g., "minutes")
            at: Specific time (e.g., "10:30")
            cron: Cron string (e.g., "*/5 * * * *")
        """
        job = {
            'task': task,
            'schedule_str': schedule_str,
            'every': every,
            'unit': unit,
            'at': at,
            'cron': cron,
            'schedule': None
        }
        self.jobs.append(job)
        self._schedule_job(job)

    def _schedule_job(self, job: dict) -> None:
        """Internal method to configure the schedule for a job"""
        if job['cron']:
            # Parse cron string (simplified implementation)
            parts = job['cron'].split()
            if len(parts) != 5:
                raise ValueError("Cron string must have 5 parts")
            
            # Map to schedule syntax (basic implementation)
            minute, hour, day, month, dow = parts
            if minute != '*':
                job['schedule'] = schedule.every(int(minute.replace('*/', ''))).minutes.at(':00')
            elif hour != '*':
                job['schedule'] = schedule.every().day.at(f"{hour}:00")
            else:
                job['schedule'] = schedule.every().day.at("00:00")
            
            job['schedule'].do(job['task'])
        elif job['schedule_str']:
            # Parse simple schedule string
            parts = job['schedule_str'].split()
            if parts[0] != 'every':
                raise ValueError("Schedule string must start with 'every'")
            
            interval = int(parts[1])
            unit = parts[2]
            getattr(schedule.every(interval), unit).do(job['task'])
        elif job['every'] and job['unit']:
            # Interval scheduling
            if job['at']:
                getattr(schedule.every(job['every']), job['unit']).at(job['at']).do(job['task'])
            else:
                getattr(schedule.every(job['every']), job['unit']).do(job['task'])
        else:
            raise ValueError("Invalid scheduling parameters")

    def start(self, run_continuously: bool = True) -> None:
        """Start the scheduler in a background thread"""
        if self._running:
            return
        
        self._running = True
        
        if run_continuously:
            self._thread = Thread(target=self._run_continuously, daemon=True)
            self._thread.start()
        else:
            self._run_pending()

    def stop(self) -> None:
        """Stop the scheduler"""
        self._running = False
        if self._thread:
            self._thread.join()
            self._thread = None

    def _run_continuously(self) -> None:
        """Run the scheduler continuously"""
        while self._running:
            self._run_pending()
            time.sleep(1)

    def _run_pending(self) -> None:
        """Run all pending jobs"""
        schedule.run_pending()

    def clear(self) -> None:
        """Clear all scheduled jobs"""
        schedule.clear()
        self.jobs = []

# Example usage
if __name__ == "__main__":
    def task1():
        print(f"[Task1] Running at {datetime.now().strftime('%H:%M:%S')}")

    def task2():
        print(f"[Task2] Running at {datetime.now().strftime('%H:%M:%S')}")

    def task3():
        print(f"[Task3] Running at {datetime.now().strftime('%H:%M:%S')}")

    scheduler = JobScheduler()

    # Different scheduling options
    scheduler.add_job(task1, every=10, unit="seconds")  # Every 10 seconds
    scheduler.add_job(task2, at=":30", every=1, unit="minutes")  # Every minute at :30
    scheduler.add_job(task3, cron="*/5 * * * *")  # Every 5 minutes (cron syntax)

    print("Starting scheduler (Ctrl+C to stop)...")
    scheduler.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nStopping scheduler...")
        scheduler.stop()