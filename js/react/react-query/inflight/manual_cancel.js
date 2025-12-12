import { useQueryClient } from '@tanstack/react-query';

const SearchComponent = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');

  // Cancel previous search when term changes
  useEffect(() => {
    return () => {
      queryClient.cancelQueries(['search', searchTerm]);
    };
  }, [searchTerm, queryClient]);

  const { data } = useQuery({
    queryKey: ['search', searchTerm],
    queryFn: ({ signal }) => searchAPI(searchTerm, { signal }),
    enabled: !!searchTerm,
  });

  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      {/* Display results */}
    </div>
  );
};