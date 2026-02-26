import { useDispatch } from 'react-redux';
import { logout } from './authActions';

function LogoutButton() {
  const dispatch = useDispatch();
  
  return (
    <button onClick={() => dispatch(logout())}>
      Logout
    </button>
  );
}