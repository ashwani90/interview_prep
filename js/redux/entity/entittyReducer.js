// entityReducer.js
import { schema } from './schema';

const initialState = {
  users: {
    byId: {},
    allIds: []
  },
  posts: {
    byId: {},
    allIds: []
  },
  comments: {
    byId: {},
    allIds: []
  }
};

export default function entityReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ENTITIES':
      return addEntities(state, action.payload);
      
    case 'UPDATE_ENTITY':
      return updateEntity(state, action.payload);
      
    case 'DELETE_ENTITY':
      return deleteEntity(state, action.payload);
      
    default:
      return state;
  }
}

// Helper functions
function addEntities(state, { entityType, entities }) {
  const newState = { ...state };
  entities.forEach(entity => {
    if (!newState[entityType].byId[entity.id]) {
      newState[entityType].byId[entity.id] = entity;
      newState[entityType].allIds.push(entity.id);
    }
  });
  return newState;
}

function updateEntity(state, { entityType, entity }) {
  if (!state[entityType].byId[entity.id]) return state;
  
  return {
    ...state,
    [entityType]: {
      ...state[entityType],
      byId: {
        ...state[entityType].byId,
        [entity.id]: {
          ...state[entityType].byId[entity.id],
          ...entity
        }
      }
    }
  };
}

function deleteEntity(state, { entityType, entityId }) {
  if (!state[entityType].byId[entityId]) return state;
  
  const newState = { ...state };
  delete newState[entityType].byId[entityId];
  newState[entityType].allIds = newState[entityType].allIds.filter(id => id !== entityId);
  
  // Cascade delete related entities if needed
  // (Implementation depends on your business logic)
  
  return newState;
}