// components/CustomTupleLabel.tsx

import React from "react";

interface StatusProps {
  status: [string, string];
}

const StatusComponent: React.FC<StatusProps> = ({ status }) => {
  const [statusName, svgLink] = status;

  return (
    <div className="flex flex-row flex-grow">
      <label className="flex w-3/4 p-1.5">{statusName}</label>

      <div className="flex items-start">
        <img src={svgLink} alt="SVG Image" className="w-8 h-8" />
      </div>
    </div>
  );
};

export default StatusComponent;
