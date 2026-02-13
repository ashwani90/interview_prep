import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/postsApi';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await api.get('/posts');
    return response.data;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: Date.now(),
            title,
            content,
            user: userId,
            date: new Date().toISOString()
          }
        };
      }
    },
    postDeleted(state, action) {
      state.items = state.items.filter(post => post.id !== action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { postAdded, postDeleted } = postsSlice.actions;

export default postsSlice.reducer;