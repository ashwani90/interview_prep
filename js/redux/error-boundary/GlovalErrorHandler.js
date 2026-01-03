// GlobalErrorHandler.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startRecovery, recoveryComplete } from './errorActions';

export default function GlobalErrorHandler() {
  const dispatch = useDispatch();
  const { error, recoveryInProgress } = useSelector(state => state.error);

  useEffect(() => {
    if (error && !recoveryInProgress) {
      const recoverApp = async () => {
        dispatch(startRecovery());
        
        // Perform any state cleanup here
        // Example: Reset specific reducers or clear sensitive data
        
        // Simulate async recovery (e.g., reload critical data)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        dispatch(recoveryComplete());
      };

      recoverApp();
    }
  }, [error, recoveryInProgress, dispatch]);

  if (recoveryInProgress) {
    return (
      <div className="recovery-screen">
        <h2>Recovering application...</h2>
        <div className="loader" />
      </div>
    );
  }

  return null;
}