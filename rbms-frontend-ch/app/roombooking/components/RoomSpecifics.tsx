import React, { useState } from "react";
import RectangularCheckbox from "./RoomSpecificsComponents/RectangularCheckbox";
import CapacityInput from "./RoomSpecificsComponents/CapacityInputBox";
import LargeTextbox from "./RoomSpecificsComponents/LargeTextBox";

const RoomSpecifics = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-2xl h-full p-5 flex-col">
      <div className="flex ">
        <div>
          <h1 className="text-lg">Room Specifics</h1>
        </div>
        <img
          src="../Components-icon/Room Specifics Logo.svg"
          className="ml-2 mt-1.5 w-4 h-4"
        />
      </div>

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
