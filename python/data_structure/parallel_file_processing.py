import os
import multiprocessing
from multiprocessing import Pool
import time
from typing import List, Dict, Callable
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class ParallelFileProcessor:
    def __init__(self, num_workers: int = None, chunk_size: int = 1):
        """
        Initialize the file processor.
        
        Args:
            num_workers: Number of worker processes (default: CPU count)
            chunk_size: Number of files processed by each worker at a time
        """
        self.num_workers = num_workers or multiprocessing.cpu_count()
        self.chunk_size = chunk_size
        self.pool = None

    def process_files(
        self,
        file_paths: List[str],
        process_func: Callable[[str], Dict],
        result_handler: Callable[[Dict], None] = None
    ) -> List[Dict]:
        """
        Process files in parallel.
        
        Args:
            file_paths: List of file paths to process
            process_func: Function that takes a file path and returns a result dict
            result_handler: Optional callback to handle each result as it completes
            
        Returns:
            List of results from all processed files
        """
        logger.info(f"Starting processing {len(file_paths)} files with {self.num_workers} workers")
        start_time = time.time()
        
        try:
            with Pool(processes=self.num_workers) as self.pool:
                # Process files in parallel
                if result_handler:
                    # Use async with callback for progressive results
                    results = []
                    for file_path in file_paths:
                        async_result = self.pool.apply_async(
                            self._wrap_process_func,
                            (process_func, file_path),
                            callback=result_handler
                        )
                        results.append(async_result)
                    
                    # Wait for all tasks to complete
                    [result.wait() for result in results]
                    processed_results = [result.get() for result in results]
                else:
                    # Process in chunks for better performance with many small files
                    processed_results = self.pool.starmap(
                        self._wrap_process_func,
                        [(process_func, fp) for fp in file_paths],
                        chunksize=self.chunk_size
                    )
                
                elapsed = time.time() - start_time
                logger.info(f"Processed {len(processed_results)} files in {elapsed:.2f} seconds")
                return processed_results
                
        except Exception as e:
            logger.error(f"Error during parallel processing: {str(e)}")
            raise
        finally:
            if self.pool:
                self.pool.close()

    def _wrap_process_func(self, process_func: Callable, file_path: str) -> Dict:
        """Wrapper to add error handling around the process function"""
        try:
            if not os.path.exists(file_path):
                logger.warning(f"File not found: {file_path}")
                return {"file": file_path, "error": "File not found"}
            
            start_time = time.time()
            result = process_func(file_path)
            processing_time = time.time() - start_time
            
            return {
                "file": file_path,
                "result": result,
                "processing_time": processing_time,
                "success": True
            }
        except Exception as e:
            logger.error(f"Error processing {file_path}: {str(e)}")
            return {
                "file": file_path,
                "error": str(e),
                "success": False
            }

# Example processing functions
def count_lines(file_path: str) -> int:
    """Example processing function: count lines in a file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        return sum(1 for _ in f)

def word_count(file_path: str) -> Dict[str, int]:
    """Example processing function: count word frequencies"""
    from collections import defaultdict
    counts = defaultdict(int)
    with open(file_path, 'r', encoding='utf-8') as f:
        for line in f:
            for word in line.split():
                counts[word.lower()] += 1
    return dict(counts)

def handle_result(result: Dict):
    """Example result handler callback"""
    if result['success']:
        logger.info(f"Processed {result['file']} in {result['processing_time']:.3f}s")
    else:
        logger.warning(f"Failed {result['file']}: {result['error']}")

def main():
    # Create sample files for demonstration
    sample_files = []
    os.makedirs("sample_files", exist_ok=True)
    for i in range(1, 11):
        file_path = f"sample_files/file_{i}.txt"
        with open(file_path, 'w') as f:
            f.write(f"This is sample file {i}\n" * 1000)
        sample_files.append(file_path)
    
    # Initialize processor
    processor = ParallelFileProcessor(num_workers=4)
    
    # Option 1: Simple processing with line count
    logger.info("\n=== Counting lines ===")
    line_counts = processor.process_files(sample_files, count_lines)
    for result in line_counts:
        if result['success']:
            print(f"{result['file']}: {result['result']} lines")
    
    # Option 2: Word count with progress callback
    logger.info("\n=== Counting words with callback ===")
    processor.process_files(
        sample_files,
        word_count,
        result_handler=handle_result
    )

if __name__ == "__main__":
    # Required for Windows multiprocessing
    multiprocessing.freeze_support()
    main()