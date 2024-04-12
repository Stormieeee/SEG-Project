import React from "react";

const Shimmer = ({ width, height } : any) => {
  return (
    <div
      className="animate-pulse bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 rounded-lg"
      style={{ width, height }}
    ></div>
  );
};

export default Shimmer;