""" 
Implement a DataPipeline class that uses method chaining (fluent interface).
"""

from typing import List, Dict, Callable, Any, Optional
import pandas as pd

class DataPipeline:
    def __init__(self, data: Optional[Any] = None):
        self._data = data
        self._operations: List[Dict[str, Any]] = []
    
    def load_csv(self, file_path: str) -> 'DataPipeline':
        """Load data from a CSV file"""
        self._data = pd.read_csv(file_path)
        self._operations.append({'operation': 'load_csv', 'file_path': file_path})
        return self
    
    def load_json(self, file_path: str) -> 'DataPipeline':
        """Load data from a JSON file"""
        self._data = pd.read_json(file_path)
        self._operations.append({'operation': 'load_json', 'file_path': file_path})
        return self
    
    def filter(self, condition: Callable) -> 'DataPipeline':
        """Filter rows based on a condition"""
        if self._data is not None:
            self._data = self._data[condition(self._data)]
        self._operations.append({'operation': 'filter', 'condition': condition.__name__})
        return self
    
    def transform(self, column: str, func: Callable) -> 'DataPipeline':
        """Apply a transformation to a column"""
        if self._data is not None:
            self._data[column] = self._data[column].apply(func)
        self._operations.append({
            'operation': 'transform', 
            'column': column, 
            'function': func.__name__
        })
        return self
    
    def group_by(self, column: str, agg_func: Dict[str, str]) -> 'DataPipeline':
        """Group data by a column and apply aggregation"""
        if self._data is not None:
            self._data = self._data.groupby(column).agg(agg_func).reset_index()
        self._operations.append({
            'operation': 'group_by', 
            'column': column, 
            'agg_func': agg_func
        })
        return self
    
    def sort(self, column: str, ascending: bool = True) -> 'DataPipeline':
        """Sort data by a column"""
        if self._data is not None:
            self._data = self._data.sort_values(column, ascending=ascending)
        self._operations.append({
            'operation': 'sort', 
            'column': column, 
            'ascending': ascending
        })
        return self
    
    def rename(self, columns: Dict[str, str]) -> 'DataPipeline':
        """Rename columns"""
        if self._data is not None:
            self._data = self._data.rename(columns=columns)
        self._operations.append({
            'operation': 'rename', 
            'columns': columns
        })
        return self
    
    def get_data(self) -> Any:
        """Get the processed data"""
        return self._data
    
    def get_operations(self) -> List[Dict[str, Any]]:
        """Get the list of operations performed"""
        return self._operations
    
    def execute(self) -> 'DataPipeline':
        """Execute all operations (useful for deferred execution)"""
        # In this simple implementation, operations execute immediately
        # This method is here for interface consistency
        return self
    
    def __str__(self) -> str:
        return f"DataPipeline(data_type={type(self._data)}, operations={len(self._operations)})"


# Example usage
if __name__ == "__main__":
    # Create a sample CSV file for demonstration
    import tempfile
    with tempfile.NamedTemporaryFile(mode='w+', suffix='.csv', delete=False) as tmp:
        tmp.write("name,age,salary\nalice,28,75000\nbob,35,90000\ncharlie,42,110000\ndave,28,65000\n")
        tmp.flush()
        csv_path = tmp.name
    
    try:
        # Build and execute the pipeline
        pipeline = (DataPipeline()
                    .load_csv(csv_path)
                    .filter(lambda df: df['age'] > 30)
                    .transform('name', lambda x: x.capitalize())
                    .group_by('age', {'salary': 'mean'})
                    .rename({'salary': 'average_salary'})
                    .sort('average_salary', ascending=False)
                    .execute())
        
        # Get the results
        print("Processed Data:")
        print(pipeline.get_data())
        
        print("\nOperations Performed:")
        for op in pipeline.get_operations():
            print(f"- {op['operation']}: {op}")
    
    finally:
        import os
        os.unlink(csv_path)