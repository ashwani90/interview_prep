import React, { useState, useEffect } from 'react';

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        const response = await new Promise(resolve => 
          setTimeout(() => resolve({
            data: Array.from({ length: 10 }, (_, i) => ({ id: i, name: `Item ${i + 1}` }))
          }), 500)
        );
        
        // Transform data - take first 5 items
        const firstFiveItems = response.data.slice(0, 5);
        setItems(firstFiveItems);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>First 5 Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;