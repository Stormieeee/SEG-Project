import { useEffect, useState } from "react";

export const LoadingState = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to start loading
  const startLoading = () => {
    console.log("loading has started")
    setIsLoading(true);
  };

  // Function to stop loading
  const stopLoading = () => {
    console.log("loading has stop")
    setIsLoading(false);
  };

  // Effect to stop loading when component unmounts
  useEffect(() => {
    return () => {
        console.log("loading is false")
      setIsLoading(false);
    };
  }, []);

  // Return loading state and functions to start/stop loading
  return {
    isLoading,
    startLoading,
    stopLoading,
  };
};