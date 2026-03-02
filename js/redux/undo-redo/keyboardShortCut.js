import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { undo, redo } from '../store/actions/undoActions';

const useKeyboardShortcuts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Ctrl+Z (undo) or Ctrl+Y (redo)
      if (e.ctrlKey && !e.shiftKey && e.key === 'z') {
        e.preventDefault();
        dispatch(undo());
      } else if ((e.ctrlKey && e.shiftKey && e.key === 'z') || (e.ctrlKey && e.key === 'y')) {
        e.preventDefault();
        dispatch(redo());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);
};

export default useKeyboardShortcuts;