// optimisticActions.js
import { v4 as uuidv4 } from 'uuid';

export const optimisticUpdate = (key, optimisticValue, apiCall) => async (dispatch) => {
  const transactionId = uuidv4();
  
  // 1. Dispatch optimistic update
  dispatch({
    type: 'OPTIMISTIC_UPDATE_START',
    payload: {
      key,
      optimisticValue,
      transactionId
    }
  });

  try {
    // 2. Make the actual API call
    const response = await apiCall();
    const confirmedValue = await response.json();

    // 3. If successful, confirm the update (or update with server response)
    dispatch({
      type: 'OPTIMISTIC_UPDATE_SUCCESS',
      payload: {
        transactionId,
        key,
        value: confirmedValue // Use server response if needed
      }
    });

  } catch (error) {
    // 4. If failed, rollback
    dispatch({
      type: 'OPTIMISTIC_UPDATE_FAILURE',
      payload: {
        transactionId,
        error
      }
    });

    // Optional: Show error notification
    dispatch(showErrorNotification('Update failed. Reverted changes.'));
  }
};