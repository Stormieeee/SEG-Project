import React, { useState } from "react";

interface CapacityInputProps {
  setCapacity: (capacity: number) => void;
}

const CapacityInput:React.FC<CapacityInputProps> = ({setCapacity}) => {

  const[capacityValue, setCapacityValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCapacityValue(event.target.value);
    setCapacity(parseInt(event.target.value) || 30);
  };
  
  return (
    <div className="">
      <label className="font-semibold">Capacity: </label>
      <input
        type="number"
        className="rounded-lg bg-blue-100 w-24 h-12 text-center mx-3"
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
