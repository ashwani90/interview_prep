import csv
from typing import Iterator, Union, List, Dict

def csv_reader(file_path: str, delimiter: str = ',', 
               headers: Union[List[str], None] = None, 
               return_dict: bool = False) -> Iterator[Union[List[str], Dict[str, str]]]:
    """
    Memory-efficient CSV reader that yields rows one at a time.
    
    Args:
        file_path: Path to CSV file
        delimiter: Field delimiter character
        headers: Optional list of column headers
        return_dict: If True, yields dictionaries; if False, yields lists
    
    Yields:
        Each row as either a list or dictionary
    """
    with open(file_path, mode='r', encoding='utf-8') as file:
        reader = csv.reader(file, delimiter=delimiter)
        
        # Get headers (first row if not provided)
        if headers is None:
            headers = next(reader)
        
        for row in reader:
            if return_dict:
                # Yield as dictionary if requested
                yield dict(zip(headers, row))
            else:
                # Yield as list by default
                yield row

# Example usage
if __name__ == "__main__":
    # Create a sample CSV file
    sample_csv = """name,age,city
Alice,30,New York
Bob,25,Los Angeles
Charlie,35,Chicago"""
    
    with open('sample.csv', 'w') as f:
        f.write(sample_csv)
    
    print("Reading as lists:")
    for row in csv_reader('sample.csv'):
        print(row)
    
    print("\nReading as dictionaries:")
    for row in csv_reader('sample.csv', return_dict=True):
        print(row)
    
    print("\nReading with custom headers:")
    custom_headers = ['full_name', 'years', 'location']
    for row in csv_reader('sample.csv', headers=custom_headers, return_dict=True):
        print(row)
    
    print("\nReading large file efficiently:")
    # This demonstrates the memory efficiency - only one row in memory at a time
    counter = 0
    for row in csv_reader('sample.csv'):
        counter += 1
        # Process each row without loading entire file
    print(f"Processed {counter} rows")