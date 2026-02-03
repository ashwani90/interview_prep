// usePagination.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setCurrentPage, 
  fetchPage,
  setPageSize
} from './paginationActions';

export default function usePagination() {
  const dispatch = useDispatch();
  const {
    data,
    pages,
    currentPage,
    pageSize,
    totalCount,
    loading,
    error
  } = useSelector(state => state.pagination);

  // Get current page items
  const currentItems = pages[currentPage] 
    ? pages[currentPage].map(id => data[id]) 
    : [];

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);

  // Fetch page when currentPage changes
  useEffect(() => {
    dispatch(fetchPage(currentPage));
  }, [currentPage, pageSize, dispatch]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  const changePageSize = (size) => {
    dispatch(setPageSize(size));
  };

  return {
    currentItems,
    currentPage,
    pageSize,
    totalPages,
    totalCount,
    loading,
    error,
    goToPage,
    changePageSize,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
}