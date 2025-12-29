// entitySelectors.js
import { createSelector } from 'reselect';
import { schema } from './schema';

// Basic selectors
const selectEntities = (state) => state.entities;

// Memoized selectors
export const makeGetEntitySelector = (entityType) => 
  createSelector(
    [selectEntities, (_, id) => id],
    (entities, id) => entities[entityType].byId[id]
  );

export const makeGetRelatedEntitiesSelector = (entityType, relationName) => 
  createSelector(
    [selectEntities, (_, entity) => entity],
    (entities, entity) => {
      if (!entity) return null;
      
      const relationConfig = schema[entityType][relationName];
      if (!relationConfig) return null;
      
      const relatedEntityType = relationConfig.relation;
      const foreignKey = relationConfig.foreignKey;
      
      if (relationConfig.type === 'single') {
        return entities[relatedEntityType].byId[entity[foreignKey]];
      } else {
        return entities[relatedEntityType].allIds
          .map(id => entities[relatedEntityType].byId[id])
          .filter(relatedEntity => relatedEntity[foreignKey] === entity.id);
      }
    }
  );

// Example composite selector
export const makeGetUserWithPostsSelector = () => 
  createSelector(
    [makeGetEntitySelector('users'), makeGetRelatedEntitiesSelector('users', 'posts')],
    (user, posts) => ({
      ...user,
      posts: posts || []
    })
  );