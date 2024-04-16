import React from "react";
import CapacityLabel from "./CapacityLabel";
import EquipmentLabel from "./EquipmentLabel";
import descriptionLogo from "../../../../../public/Components-icon/Description Logo.svg";
import { FORM_CONTAINER, FormHeader } from "../ComponentFormat";
import { useStateContext } from "../../StateContext";

const Description = () => {
  const { roomCapacity, roomEquipment, isRoomDescEmpty } = useStateContext();

  const formattedEquipment = roomEquipment.map(([name, amount]) => ({
    name,
    amount,
  }));

  return (
    <div className={`${FORM_CONTAINER} justify-start flex `}>
      {isRoomDescEmpty ? (
        <>
          <div className="flex">
            <div className="flex items-center flex-row pt-3">
              <FormHeader
                id="3"
                title="Description"
                imgPath={descriptionLogo}
                imgAlt="Description Logo"
              />
            </div>
          </div>
          <div className="mt-3 flex-col w-full space-y-0.5 ml-2">
            <CapacityLabel number={roomCapacity} />

            <EquipmentLabel equipment={formattedEquipment} />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <span className="text-lg font-semibold flex items-center text-black-500">
            Select a room
          </span>
        </div>
      )}
    </div>
  );
};

export default Description;
