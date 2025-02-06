import { Children, createContext, useContext, useState } from "react";
import { LoaderContextType } from "../types/loader.types";


const LoaderContext = createContext(null);

export const useLoaderContext = () => {
    return useContext(LoaderContext);
};

const LoaderProvider = ({ children }) => {
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