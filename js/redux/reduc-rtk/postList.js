// PostsList.js
import React from 'react'
import {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from './apiSlice'

function PostsList() {
  const {
    data: posts = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetPostsQuery(undefined, {
    pollingInterval: 60000, // Optional: refetch every 60 seconds
    refetchOnFocus: true,  // Optional: refetch when window regains focus
    refetchOnReconnect: true, // Optional: refetch on network reconnect
  })

  const [addPost] = useAddPostMutation()
  const [updatePost] = useUpdatePostMutation()
  const [deletePost] = useDeletePostMutation()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.toString()}</div>

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2>Posts</h2>
        <button onClick={refetch}>Refresh</button>
      </div>
      
      {isFetching && <div>Updating...</div>}
      
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-4 p-4 border rounded">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => updatePost({ id: post.id, title: 'Updated Title' })}>
                Update
              </button>
              <button onClick={() => deletePost(post.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      <button 
        onClick={() => addPost({ title: 'New Post', body: 'Content here' })}
        className="mt-4"
      >
        Add Post
      </button>
    </div>
  )
}

export default PostsList