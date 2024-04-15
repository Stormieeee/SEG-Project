import React from "react";

const Shimmer = ({ width, height } : any) => {
  return (
    <div
      className="animate-pulse bg-gradient-to-r from-gray-300/30 via-gray-300/70 to-gray-300/30 rounded-lg backdrop-blur-xl"
      style={{ width, height }}
    ></div>
  );
};

export default Shimmer;