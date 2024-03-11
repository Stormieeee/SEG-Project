import React from "react";
import CapacityLabel from "./DescriptionComponents/CapacityLabel";
import EquipmentLabel from "./DescriptionComponents/EquipmentLabel";

const Description = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-2xl h-full p-5 flex flex-col">
      <div className="flex">
        <div>
          <h1 className="text-md">Description</h1>
        </div>
        <img
          src="../Components-icon/Description Logo.svg"
          className="ml-2 mt-1 w-4 h-4"
        />
      </div>

      <div className="mt-3 flex-col w-full">
        <CapacityLabel number={20} />
        <EquipmentLabel
          equipment={[
            { name: "Computer", amount: 1 },
            { name: "Microphone", amount: 2 },
            { name: "Seats", amount: 20 },
            { name: "Projector", amount: 1 },
          ]}
        />
      </div>
    </div>
  );
};

export default Description;
