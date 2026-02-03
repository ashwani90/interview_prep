// paginationReducer.js
const initialState = {
    data: {},
    pages: {},
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    loading: false,
    error: null
  };
  
  export default function paginationReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_PAGE_SIZE':
        return {
          ...state,
          pageSize: action.payload,
          // Reset to first page when page size changes
          currentPage: 1,
          pages: {}
        };
  
      case 'SET_CURRENT_PAGE':
        return {
          ...state,
          currentPage: action.payload
        };
  
      case 'FETCH_PAGE_REQUEST':
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case 'FETCH_PAGE_SUCCESS':
        return {
          ...state,
          loading: false,
          pages: {
            ...state.pages,
            [action.meta.page]: action.payload.ids
          },
          data: {
            ...state.data,
            ...action.payload.entities
          },
          totalCount: action.payload.totalCount
        };
  
      case 'FETCH_PAGE_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload
        };
  
      case 'INVALIDATE_PAGE':
        const { [action.payload]: _, ...remainingPages } = state.pages;
        return {
          ...state,
          pages: remainingPages
        };
  
      default:
        return state;
    }
  }