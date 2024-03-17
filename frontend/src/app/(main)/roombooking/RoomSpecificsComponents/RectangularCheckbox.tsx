"use client";

import React, { useState } from "react";

const RectangularCheckbox: React.FC<{ label: string }> = ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="flex items-center relative space-x-2 rounded-[5px] border border-blue-400 text-blue-600 my-3 p-3 w-56 h-12">
      <label>{label}</label>
      <div
        className={`w-6 h-6 border border-gray-300 rounded cursor-pointer flex right-4 absolute ${
          isChecked ? "bg-blue-500 border-blue-500" : ""
        }`}
        onClick={handleCheckboxChange}
      >
        {isChecked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            className="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      
    </div>
  );
};

export default RectangularCheckbox;
