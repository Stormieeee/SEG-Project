import React from "react";

interface CapacityProps {
  number: number;
}

const CapacityLabel: React.FC<CapacityProps> = ({ number }) => {
  return (
    <div>
      <label className="text-sm pr-7">Capacity</label>
      <label className="text-sm font-semibold">{number}</label>
    </div>
  );
};

export default CapacityLabel;
