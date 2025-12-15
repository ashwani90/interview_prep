import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchResults = async ({ queryKey, pageParam = 1 }) => {
  const [_, searchTerm] = queryKey;
  const page = pageParam;
  const { data } = await axios.get(`https://api.example.com/search?q=${searchTerm}&page=${page}`);
  return data;
};

const PaginatedSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['search', searchTerm, page],
    queryFn: fetchResults,
    keepPreviousData: true,
    staleTime: 5000,
    enabled: !!searchTerm, // Only run query when searchTerm exists
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Reset to page 1 when search term changes
    setPage(1);
    // Invalidate all search queries to force refetch
    queryClient.invalidateQueries(['search']);
  };

  const handleNextPage = () => {
    if (data?.hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    setPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <div>
      <h1>Paginated Search</h1>
      
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && !data ? (
        <div>Loading initial results...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <div>
            {data?.results?.map((item) => (
              <div key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          <div className="pagination-controls">
            <button 
              onClick={handlePrevPage} 
              disabled={page === 1 || isFetching}
            >
              Previous
            </button>
            
            <span>Page {page}</span>
            
            <button
              onClick={handleNextPage}
              disabled={!data?.hasMore || isFetching}
            >
              Next
            </button>
          </div>

          {isFetching && <div>Fetching more results...</div>}
        </>
      )}
    </div>
  );
};

export default PaginatedSearch;