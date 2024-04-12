import React from "react";
import CapacityLabel from "./CapacityLabel";
import EquipmentLabel from "./EquipmentLabel";
import descriptionLogo from "../../../../../public/Components-icon/Description Logo.svg"
import Image from "next/image";
import { FORM_CONTAINER, FormHeader } from "../ComponentFormat";

const Description = () => {
  return (
    <div className={FORM_CONTAINER}>
      <div className="flex">
      <div className="flex items-center flex-row">
      <FormHeader
            id="3"
            title="Description"
            imgPath={descriptionLogo}
            imgAlt="Description Logo"
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
