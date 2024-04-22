import React from "react";
import { ring } from "ldrs";

const LoadingSpinner = () => {

  ring.register();

  return (
    <l-ring
      size="30"
      stroke="5"
      bg-opacity="0"
      speed="2"
      color="#cbd5e1"
    ></l-ring>
  );
};

export default LoadingSpinner;
