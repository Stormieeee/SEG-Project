import React from "react";
import RectangularCheckbox from "./RectangularCheckbox";
import CapacityInput from "./CapacityInputBox";
import LargeTextbox from "./LargeTextBox";
import { FORM_CONTAINER, FormHeader } from "../ComponentFormat";
import roomspecificlogo from "/public/Components-icon/Room Specifics Logo.svg";
const RoomSpecifics = () => {
  return (
    <div className={FORM_CONTAINER}>
      <FormHeader
        id="2"
        title="Room Specifics"
        imgPath={roomspecificlogo}
        imgAlt="Room Specific Logo"
      />
      <div className="flex">
        <div className="w-1/2 mt-2 flex flex-col">
          <RectangularCheckbox label="Lecture" />
          <RectangularCheckbox label="Study" />
          <RectangularCheckbox label="Presentation" />
          <RectangularCheckbox label="Events" />
          <RectangularCheckbox label="Meetings" />
        </div>

        <div className="w-1/2 mt-5 flex flex-col">
          <CapacityInput />

          <div className="mt-16 flex flex-col">
            <RectangularCheckbox label="Others" />
            <LargeTextbox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSpecifics;
