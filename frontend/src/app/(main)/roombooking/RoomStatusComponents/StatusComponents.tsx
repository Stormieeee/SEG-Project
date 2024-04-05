import React from "react";
import { FORM_CONTAINER } from "../ComponentFormat";

const STATUS = [
  { name: "Available", color: "bg-primary-100 border border-primary-400" },
  { name: "Not suitable", color: "bg-yellow-100 border border-yellow-400" },
  { name: "Fully Booked", color: "bg-red-100 border border-red-400" },
  { name: "Unavailable", color: "bg-black-100 border border-black-400" },
];

const STATUS_COLOR = "w-5 h-5 rounded-full ml-auto";

const RoomStatusKey = () => {
  return (
    <div className={FORM_CONTAINER}>
      <div className="flex flex-col h-full">
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
