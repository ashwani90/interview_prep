// schema.js
export const schema = {
    users: {
      posts: { type: 'array', relation: 'posts', foreignKey: 'userId' }
    },
    posts: {
      user: { type: 'single', relation: 'users', foreignKey: 'userId' },
      comments: { type: 'array', relation: 'comments', foreignKey: 'postId' }
    },
    comments: {
      post: { type: 'single', relation: 'posts', foreignKey: 'postId' },
      user: { type: 'single', relation: 'users', foreignKey: 'userId' }
    }
  };