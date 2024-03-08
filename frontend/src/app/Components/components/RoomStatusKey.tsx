import React from "react";
import { FORM_CONTAINER } from "./ComponentFormat";
import ComponentTitle from "./ComponentTitle";

const STATUS = [
  { name: "Available", color: "bg-cyan-500" },
  { name: "Not suitable", color: "bg-yellow-400" },
  { name: "Fully Booked", color: "bg-red-600" },
  { name: "Unavailable", color: "bg-gray-200" }
];

const STATUS_COLOR = "w-5 h-5 rounded-full ml-auto";

const RoomStatusKey = () => {
  return (
    <div className={FORM_CONTAINER}>
      <div className="flex flex-col h-full">
        <ComponentTitle title="4 Color Status" image="" altImg="Color Status Logo" />
        {STATUS.map((status, index) => (
          <div key={index} className="flex h-1/4 items-center">
            <div>{status.name}</div>
            <div className={`${STATUS_COLOR} ${status.color}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomStatusKey;
