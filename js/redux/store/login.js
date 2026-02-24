import { useDispatch } from 'react-redux';
import { login } from './authActions';

function LoginForm() {
  const dispatch = useDispatch();
  
  const handleSubmit = async (credentials) => {
    try {
      await dispatch(login(credentials));
      // Redirect to dashboard
    } catch (error) {
      // Show error
    }
  };
  
  return (
    // Your form JSX
  );
}