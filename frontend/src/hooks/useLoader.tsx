import { useState } from 'react';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Function to toggle the loading state
  const setLoading = (loadingState: boolean) => {
    setIsLoading(loadingState);
  };

  return [isLoading, setLoading];
};

export default useLoader;
