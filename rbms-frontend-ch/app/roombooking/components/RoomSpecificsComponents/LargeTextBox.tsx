import React from "react";

const LargeTextbox: React.FC = () => {
  return (
    <div>
      <textarea
        className="w-full h-40 bg-gray-200 rounded-lg p-4"
        placeholder="Enter text here..."
      ></textarea>
    </div>
  );
};

export default LargeTextbox;
