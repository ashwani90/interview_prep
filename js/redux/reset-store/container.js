// In your logout component/container
import { useDispatch } from 'react-redux';
import { logoutUser } from './logoutAction';

function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // To reset everything:
    dispatch(logoutUser());
    
    // To preserve theme/language:
    // dispatch(logoutUser(true));
  };

  return <button onClick={handleLogout}>Logout</button>;
}