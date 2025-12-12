import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { auditLog } from './auditService'; // Your custom logging service

// Function to update user profile
const updateUserProfile = async (userData) => {
  const response = await fetch(`/api/users/${userData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(userData)
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
};

const UserProfileForm = ({ userId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data, variables, context) => {
      // Show success toast
      toast.success('Profile updated successfully!', {
        position: 'top-right',
        autoClose: 5000,
      });

      // Log successful update
      auditLog({
        event: 'USER_PROFILE_UPDATE',
        userId: variables.id,
        status: 'SUCCESS',
        metadata: {
          updatedFields: Object.keys(variables.updates)
        }
      });

      // Invalidate and refetch user data
      queryClient.invalidateQueries(['user', userId]);
    },
    onError: (error, variables, context) => {
      // Show error toast
      toast.error(`Update failed: ${error.message}`, {
        position: 'top-right',
        autoClose: 8000,
      });

      // Log error
      auditLog({
        event: 'USER_PROFILE_UPDATE',
        userId: variables.id,
        status: 'FAILED',
        error: error.message,
        metadata: {
          attemptedFields: Object.keys(variables.updates),
          timestamp: new Date().toISOString()
        }
      });

      // You could also rollback optimistic updates here if needed
      if (context?.previousUser) {
        queryClient.setQueryData(['user', userId], context.previousUser);
      }
    },
    // Optional: For optimistic updates
    onMutate: async (newData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries(['user', userId]);

      // Snapshot the previous value
      const previousUser = queryClient.getQueryData(['user', userId]);

      // Optimistically update to the new value
      queryClient.setQueryData(['user', userId], old => ({
        ...old,
        ...newData.updates
      }));

      // Return context object for onError
      return { previousUser };
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = {
      name: formData.get('name'),
      email: formData.get('email'),
      bio: formData.get('bio')
    };

    mutation.mutate({
      id: userId,
      updates
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" defaultValue={mutation.data?.name} />
      <input name="email" placeholder="Email" defaultValue={mutation.data?.email} />
      <textarea name="bio" placeholder="Bio" defaultValue={mutation.data?.bio} />
      
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Saving...' : 'Save Profile'}
      </button>

      {mutation.isError && (
        <div className="error-message">
          {mutation.error.message}
        </div>
      )}
    </form>
  );
};

// Example auditLog service (would typically be in a separate file)
const auditLog = (logData) => {
  console.log('Audit Log:', logData);
  // In a real app, this would send to your logging service
  // fetch('/api/audit-log', { method: 'POST', body: JSON.stringify(logData) });
};