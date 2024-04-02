import React from "react";
import CapacityLabel from "./CapacityLabel";
import EquipmentLabel from "./EquipmentLabel";
import descriptionLogo from "../../../../../public/Components-icon/Description Logo.svg"
import Image from "next/image";

const Description = () => {
  return (
    <div className="bg-white-50 border border-neutral-400 rounded-2xl h-full px-5 py-4 flex flex-col">
      <div className="flex">
      <div className="flex items-center flex-row">
          <span className="text-zinc-800 font-medium text-xl px-2 items-center ">
            3
          </span>
          <span className="text-zinc-600 font-medium text-xl items-center flex pr-2">
            Description
          </span>
          <Image
            src={descriptionLogo}
            alt="Date Time Logo"
            className="flex w-6 h-6"
          />
        </div>
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
