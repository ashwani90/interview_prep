// entityActions.js
export const addEntities = (entityType, entities) => ({
    type: 'ADD_ENTITIES',
    payload: { entityType, entities }
  });
  
  export const updateEntity = (entityType, entity) => ({
    type: 'UPDATE_ENTITY',
    payload: { entityType, entity }
  });
  
  export const deleteEntity = (entityType, entityId) => ({
    type: 'DELETE_ENTITY',
    payload: { entityType, entityId }
  });
  
  // Example API action
  export const fetchUserWithPosts = (userId) => async (dispatch) => {
    const [user, posts] = await Promise.all([
      fetch(`/api/users/${userId}`).then(res => res.json()),
      fetch(`/api/users/${userId}/posts`).then(res => res.json())
    ]);
    
    dispatch(addEntities('users', [user]));
    dispatch(addEntities('posts', posts));
  };