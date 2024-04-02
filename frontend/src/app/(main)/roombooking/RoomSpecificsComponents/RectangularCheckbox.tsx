"use client";

import React, { useState } from "react";


interface RectangularCheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const RectangularCheckbox: React.FC<RectangularCheckboxProps> = ( { label, checked, onChange }) => {

  const handleClick = () => {
    onChange();
  };

  return (
    <div className="flex items-center relative space-x-2 rounded-[5px] border my-2 ml-2 mr-20 py-5 px-5 border-gray-300 text-black-500 font-medium">
      <label>{label}</label>
      <div
        className={`w-6 h-6 border border-gray-300 rounded cursor-pointer flex right-4 absolute ${
          checked ? "bg-blue-500 border-blue-500" : ""
        }`}
        onClick={handleClick}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      
    </div>
  );
};

export default RectangularCheckbox;
