import React from "react";
import StatusComponent from "../../../frontend/src/app/roombooking/RoomStatusComponents/StatusComponents";

const RoomStatusKey = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-2xl h-full p-5 flex flex-col">
      <StatusComponent 
        status={["Available", "../Room-icon/Alert Icon.svg"]} 
      />
      <StatusComponent
        status={["Not available", "../Room-icon/Alert Icon.svg"]}
      />
      <StatusComponent
        status={["Fully Booked", "../Room-icon/Alert Icon.svg"]}
      />
      <StatusComponent
        status={["Unavailable", "../Room-icon/Alert Icon.svg"]}
      />
    </div>
  );
};

export default RoomStatusKey;
