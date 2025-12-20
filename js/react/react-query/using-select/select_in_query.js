import React from 'react';
import { useQuery } from 'react-query';

// Mock API function that returns a list of items
const fetchItems = async () => {
  // In a real app, this would be an actual API call
  const response = await new Promise(resolve => 
    setTimeout(() => resolve({
      data: Array.from({ length: 10 }, (_, i) => ({ id: i, name: `Item ${i + 1}` }))
    }), 500)
  );
  return response.data;
};

function ItemList() {
  // Use the useQuery hook with a select function to transform the data
  const { data, isLoading, error } = useQuery(
    'items',
    fetchItems,
    {
      select: (data) => data.slice(0, 5) // Only return first 5 items
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>First 5 Items</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;