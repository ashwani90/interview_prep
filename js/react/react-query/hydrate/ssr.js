// pages/index.js (Next.js page)
import { QueryClient, QueryClientProvider, dehydrate } from '@tanstack/react-query';
import { Hydrate } from '@tanstack/react-query';
import ExampleComponent from '../components/ExampleComponent';

// Your data fetching function
const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  // Prefetch data on the server
  await queryClient.prefetchQuery(['posts'], fetchPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home({ dehydratedState }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <ExampleComponent />
      </Hydrate>
    </QueryClientProvider>
  );
}