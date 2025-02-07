import { toast } from 'react-toastify';

// Utility function to show toast message
export const showToast = (message: string, type = 'default', options = {}) => {
  const toastOptions: object = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    ...options, // Merge custom options
  };

  switch (type) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    case 'info':
      toast.info(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }
};
