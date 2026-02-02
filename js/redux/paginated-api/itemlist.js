// ItemsList.js
import React from 'react';
import usePagination from './usePagination';

function ItemsList() {
  const {
    currentItems,
    currentPage,
    totalPages,
    loading,
    error,
    goToPage,
    changePageSize,
    hasNextPage,
    hasPrevPage
  } = usePagination();

  if (loading && currentItems.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="page-controls">
        <button 
          onClick={() => goToPage(currentPage - 1)} 
          disabled={!hasPrevPage}
        >
          Previous
        </button>
        
        <span>Page {currentPage} of {totalPages}</span>
        
        <button 
          onClick={() => goToPage(currentPage + 1)} 
          disabled={!hasNextPage}
        >
          Next
        </button>

        <select 
          value={pageSize} 
          onChange={(e) => changePageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map(size => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>

      <ul className="items-list">
        {currentItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ItemsList;