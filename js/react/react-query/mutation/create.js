// useFileUpload.js
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useFileUpload = (onSuccess, onError) => {
  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('https://your-api-endpoint.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    },
    onSuccess,
    onError,
  });
};

export default useFileUpload;