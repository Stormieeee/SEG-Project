import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white-100"></div>
    </div>
  );
};

export default LoadingSpinner;
