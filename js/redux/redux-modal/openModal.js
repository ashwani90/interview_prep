import { useDispatch } from 'react-redux';
import { openModal } from './modalActions';

function SomeComponent() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal('CONFIRM', {
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item?',
      onConfirm: () => console.log('Item deleted'),
    }));
  };

  return <button onClick={handleClick}>Delete Item</button>;
}