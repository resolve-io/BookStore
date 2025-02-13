import {createContext, ReactNode, useContext, useState } from "react";
import { LoaderContextType } from "../types/loader.types";


const LoaderContext = createContext<LoaderContextType | null>(null);

// Custom hook to access AuthContext
export const useLoaderContext = (): LoaderContextType => {
  const context = useContext(LoaderContext);

  // Ensure the context is not null and provide error handling
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context; // The context is guaranteed to have `user`, `login`, and `logout`
};

const LoaderProvider = ({ children } : { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);


    // Functions to control loading state
    const showLoader = () => setIsLoading(true);
    const hideLoader = () => setIsLoading(false);

    const values: LoaderContextType | null = {
        isLoading,
        showLoader,
        hideLoader
    }

    return (
        <LoaderContext.Provider value={values}>
           {children}
        </LoaderContext.Provider>
    )
}

export default LoaderProvider;