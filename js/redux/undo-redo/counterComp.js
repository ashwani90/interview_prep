import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter.present);
  const canUndo = useSelector(state => state.counter.past.length > 0);
  const canRedo = useSelector(state => state.counter.future.length > 0);

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch({ type: 'ADD' })}>+</button>
      <button onClick={() => dispatch({ type: 'SUBTRACT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <button 
        onClick={() => dispatch({ type: 'UNDO' })}
        disabled={!canUndo}
      >
        Undo
      </button>
      <button 
        onClick={() => dispatch({ type: 'REDO' })}
        disabled={!canRedo}
      >
        Redo
      </button>
    </div>
  );
};

export default Counter;