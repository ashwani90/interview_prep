import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchDataWithAxios = async ({ signal }) => {
  const source = axios.CancelToken.source();
  
  // Link React Query's signal to Axios cancellation
  if (signal) {
    signal.addEventListener('abort', () => {
      source.cancel('Query was cancelled by React Query');
    });
  }

  try {
    const response = await axios.get('https://api.example.com/data', {
      cancelToken: source.token,
    });
    return response.data;
  } finally {
    if (signal) {
      signal.removeEventListener('abort', () => source.cancel());
    }
  }
};

const AxiosComponent = () => {
  const { data } = useQuery({
    queryKey: ['axios-data'],
    queryFn: fetchDataWithAxios,
  });

  // ... rest of component
};