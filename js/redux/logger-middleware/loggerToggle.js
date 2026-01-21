import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLogging } from '../store/actions/loggerActions';

const LoggerToggle = () => {
  const dispatch = useDispatch();
  const isEnabled = useSelector(state => state.logger.isLoggingEnabled);

  return (
    <div className="logger-toggle">
      <label>
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={() => dispatch(toggleLogging())}
        />
        Redux Action Logging
      </label>
    </div>
  );
};

export default LoggerToggle;