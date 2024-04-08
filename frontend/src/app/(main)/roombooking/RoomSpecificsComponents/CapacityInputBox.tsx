import React, { useState } from "react";

interface CapacityInputProps {
  setCapacity: (capacity: number) => void;
}

const CapacityInput:React.FC<CapacityInputProps> = ({setCapacity}) => {

  const[capacityValue, setCapacityValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, '');

    if (numericValue !== '') {
      setCapacityValue(event.target.value);
      setCapacity(parseInt(event.target.value) || 30);
    }else{
      setCapacityValue('');
      setCapacity(30);
    }


  };
  
  return (
    <div className="">
      <label className="font-medium text-black-600">Capacity: </label>
      <input
        type="text"
        className="rounded-lg text-center bg-blue-50 text-primary-600 w-24 h-12 mx-2 placeholder-blue-400 
        focus:placeholder-opacity-0 focus:outline-none"
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
