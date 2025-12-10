// components/ExampleComponent.js
import { useQuery } from '@tanstack/react-query';

const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
};

export default function ExampleComponent() {
  // This will use the prefetched data from the server
  const { data, isLoading, isError } = useQuery(['posts'], fetchPosts);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}