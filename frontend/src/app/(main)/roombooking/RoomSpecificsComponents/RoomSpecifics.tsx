import React, { useState } from "react";
import RectangularCheckbox from "./RectangularCheckbox";
import CapacityInput from "./CapacityInputBox";
import LargeTextbox from "./LargeTextBox";
import { FORM_CONTAINER } from "../ComponentFormat";
import roomspecificlogo from "/public/Components-icon/Room Specifics Logo.svg";
import Image from "next/image";
const RoomSpecifics = () => {
  return (
    <div className={FORM_CONTAINER}>
      <div className="flex items-center">
        <span className="text-zinc-800 font-medium text-xl px-2 items-center ">
          2
        </span>
        <span className="text-zinc-600 font-medium text-xl items-center flex pr-2">
          Room Specifics
        </span>
        <Image
          src={roomspecificlogo}
          alt="Room Specific Logo"
          className="flex w-6 h-6"
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
