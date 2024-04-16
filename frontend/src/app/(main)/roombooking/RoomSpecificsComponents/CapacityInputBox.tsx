import React, { useState } from "react";

interface CapacityInputProps {
  setCapacity: (capacity: number) => void;
}

const CapacityInput:React.FC<CapacityInputProps> = ({setCapacity}) => {

  const[capacityValue, setCapacityValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
  
    // Check if the input value contains only digits
    if (/^\d*$/.test(inputValue)) {
      setCapacityValue(inputValue);
      setCapacity(parseInt(inputValue) || 30);
    } else {
      setCapacityValue(capacityValue); 
    }
  };
  
  return (
    <div className="">
      <label className="font-medium text-black-600 text-base md:text-sm">Capacity: </label>
      <input
        type="text"
        className="rounded-md text-center bg-blue-50 text-blue-500 w-24 h-12 mx-2 placeholder-blue-400 
        focus:placeholder-opacity-0 focus:outline-none md:text-sm"
        min={0} // Set the minimum value allowed
        max={100} // Set the maximum value allowed
        step={1} // Set the step for increment/decrement
        placeholder="Number"
        value={capacityValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default CapacityInput;
