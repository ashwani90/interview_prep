// app/search/[[...params]]/page.js
export default function SearchPage({ params, searchParams }) {
    const { params: searchParamsArray = [] } = params;
    const queryParams = Object.entries(searchParams);
    
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        
        {/* Show path parameters */}
        {searchParamsArray.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Path Parameters:</h2>
            <div className="bg-gray-100 p-4 rounded">
              <pre>{JSON.stringify(searchParamsArray, null, 2)}</pre>
            </div>
          </div>
        )}
        
        {/* Show query parameters */}
        {queryParams.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Query Parameters:</h2>
            <div className="bg-gray-100 p-4 rounded">
              <pre>{JSON.stringify(searchParams, null, 2)}</pre>
            </div>
          </div>
        )}
        
        {/* No parameters case */}
        {searchParamsArray.length === 0 && queryParams.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Enter a search term to see results</p>
          </div>
        )}
      </div>
    );
  }
  
  // Handle different search patterns
  export async function generateMetadata({ params, searchParams }) {
    const { params: searchParamsArray = [] } = params;
    
    if (searchParamsArray.length > 0) {
      return {
        title: `Search: ${searchParamsArray.join(' ')}`,
        description: `Search results for ${searchParamsArray.join(' ')}`,
      };
    }
    
    if (Object.keys(searchParams).length > 0) {
      return {
        title: 'Advanced Search',
        description: 'Advanced search results with filters',
      };
    }
    
    return {
      title: 'Search',
      description: 'Search page for finding content',
    };
  }