// paginationActions.js
export const setPageSize = (size) => ({
    type: 'SET_PAGE_SIZE',
    payload: size
  });
  
  export const setCurrentPage = (page) => ({
    type: 'SET_CURRENT_PAGE',
    payload: page
  });
  
  export const fetchPageRequest = () => ({
    type: 'FETCH_PAGE_REQUEST'
  });
  
  export const fetchPageSuccess = (data, page) => ({
    type: 'FETCH_PAGE_SUCCESS',
    payload: data,
    meta: { page }
  });
  
  export const fetchPageFailure = (error) => ({
    type: 'FETCH_PAGE_FAILURE',
    payload: error
  });
  
  export const invalidatePage = (page) => ({
    type: 'INVALIDATE_PAGE',
    payload: page
  });
  
  // Thunk action to fetch a page
  export const fetchPage = (page) => async (dispatch, getState) => {
    const { pagination } = getState();
    const { pageSize } = pagination;
  
    // Skip if already loading or page is cached
    if (pagination.loading || pagination.pages[page]) {
      return;
    }
  
    try {
      dispatch(fetchPageRequest());
      
      const response = await fetch(`/api/items?page=${page}&size=${pageSize}`);
      const data = await response.json();
  
      // Normalize the data (optional but recommended)
      const normalized = {
        ids: data.items.map(item => item.id),
        entities: data.items.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {}),
        totalCount: data.totalCount
      };
  
      dispatch(fetchPageSuccess(normalized, page));
    } catch (error) {
      dispatch(fetchPageFailure(error.message));
    }
  };