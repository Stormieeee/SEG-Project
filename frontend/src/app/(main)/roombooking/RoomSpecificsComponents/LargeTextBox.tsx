import React from "react";

const LargeTextbox: React.FC = () => {
  return (
    <div>
      <textarea
        className="w-full h-40 bg-black-50 rounded-lg p-4 focus:bg-white-50 focus:placeholder-white-50"
        placeholder="Enter text here..."
      ></textarea>
    </div>
  );
};

export default LargeTextbox;
