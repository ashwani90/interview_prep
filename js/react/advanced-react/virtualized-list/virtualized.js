// src/components/VirtualizedList/VirtualizedList.jsx
import React from 'react';
import { VariableSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import Row from './Row';
import { useInfiniteData } from '../../hooks/useInfiniteData';

const VirtualizedList = ({ fetchData, estimatedRowHeight = 50 }) => {
  const { items, isLoading, hasMore, loadMore } = useInfiniteData(fetchData);
  
  // Track row heights for dynamic sizing
  const rowHeights = React.useRef({});
  const listRef = React.useRef();

  const getRowHeight = index => rowHeights.current[index] || estimatedRowHeight;
  const setRowHeight = (index, height) => {
    if (rowHeights.current[index] !== height) {
      rowHeights.current[index] = height;
      listRef.current?.resetAfterIndex(index);
    }
  };

  // Infinite loading configuration
  const isItemLoaded = index => index < items.length && !hasMore;
  const loadMoreItems = isLoading ? () => {} : loadMore;

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={hasMore ? items.length + 1 : items.length}
      loadMoreItems={loadMoreItems}
      threshold={5} // Load more when user scrolls within 5 items of the end
    >
      {({ onItemsRendered, ref }) => (
        <VariableSizeList
          height={600}
          width="100%"
          itemCount={items.length}
          itemSize={getRowHeight}
          onItemsRendered={onItemsRendered}
          ref={list => {
            ref(list);
            listRef.current = list;
          }}
          itemData={{
            items,
            setRowHeight,
          }}
        >
          {Row}
        </VariableSizeList>
      )}
    </InfiniteLoader>
  );
};

export default VirtualizedList;