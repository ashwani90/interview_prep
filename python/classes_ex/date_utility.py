# Use @classmethod and @staticmethod in a DateUtility class.

import datetime

class DateUtility:
    DATE_FORMAT = "%Y-%m-%d"
    DATETIME_FORMAT = "%Y-%m-%d %H:%M:%S"
    
    def __init__(self, date_obj):
        """Initialize with a date object"""
        self.date = date_obj
    
    @classmethod
    def from_string(cls, date_string, date_format=None):
        """
        Create DateUtility instance from string (class method)
        
        Args:
            date_string (str): Date string to parse
            date_format (str, optional): Custom format string
            
        Returns:
            DateUtility: New instance
        """
        format_to_use = date_format or cls.DATE_FORMAT
        date_obj = datetime.datetime.strptime(date_string, format_to_use).date()
        return cls(date_obj)
    
    @classmethod
    def today(cls):
        """
        Create DateUtility instance for today (class method)
        
        Returns:
            DateUtility: New instance with today's date
        """
        return cls(datetime.date.today())
    
    @staticmethod
    def is_weekend(date_obj):
        """
        Check if date falls on weekend (static method)
        
        Args:
            date_obj (date): Date to check
            
        Returns:
            bool: True if weekend, False otherwise
        """
        return date_obj.weekday() >= 5  # 5=Saturday, 6=Sunday
    
    @staticmethod
    def days_between(start_date, end_date):
        """
        Calculate days between two dates (static method)
        
        Args:
            start_date (date): Start date
            end_date (date): End date
            
        Returns:
            int: Number of days between dates
        """
        return (end_date - start_date).days
    
    def add_days(self, days):
        """Add days to the stored date"""
        self.date += datetime.timedelta(days=days)
        return self
    
    def format(self, format_string=None):
        """Format the stored date"""
        format_to_use = format_string or self.DATE_FORMAT
        return self.date.strftime(format_to_use)
    
    def __str__(self):
        return f"DateUtility({self.date})"


# Example usage
if __name__ == "__main__":
    print("=== Class Method Examples ===")
    # Create instance using class method (from string)
    du1 = DateUtility.from_string("2023-05-15")
    print(f"Created from string: {du1}")
    
    # Create instance using class method (today)
    du2 = DateUtility.today()
    print(f"Today's date: {du2}")
    
    print("\n=== Static Method Examples ===")
    # Use static method directly
    test_date = datetime.date(2023, 5, 20)  # Saturday
    print(f"Is {test_date} weekend? {DateUtility.is_weekend(test_date)}")
    
    # Calculate days between dates
    date1 = datetime.date(2023, 1, 1)
    date2 = datetime.date(2023, 12, 31)
    print(f"Days between {date1} and {date2}: {DateUtility.days_between(date1, date2)}")
    
    print("\n=== Instance Method Examples ===")
    # Add days and format
    du3 = DateUtility.from_string("2023-01-01")
    print(f"Original: {du3.format()}")
    du3.add_days(100)
    print(f"After adding 100 days: {du3.format('%B %d, %Y')}")
    
    # Check if stored date is weekend
    print(f"Is {du3.date} weekend? {DateUtility.is_weekend(du3.date)}")