"use client";

import React, { useState } from "react";
import fullBookedIcon from "../../../../../public/Room-icon/Fully Booked Logo.svg";
import Image from "next/image";
//Test List of Rooms
const roomid = [
  {
    roomID: "2R008",
    status: false,
    date: "2024-13-03",
    start_time: 9,
    end_time: 10,
  },
  {
    roomID: "2R009",
    status: true,
    date: "2024-13-03",
    start_time: 9,
    end_time: 10,
  },
];


const handlesRoomUpdate = () =>{
  
}

const FloorPlan = () => {
  
  const [checkStatus, setCheckStatus] = useState("");
  return (
    <div className="bg-white border border-gray-300 rounded-2xl h-full p-5">
      <div className="m-2 flex flex-row">
        {roomid.map((room, index) => {
          if (room.status == false) {
            return (
              <div
                key={index}
                className=" bg-primary-50 border-2 border-primary-200 rounded-md py-16 px-7 mx-2 flex flex-col align-bottom items-center"
              >
                <p className="flex">{room.roomID}</p>
              </div>
            );
          } else {
            return (
              <div key={index} className=" bg-red-50 border-2 border-red-400 rounded-md py-16 px-7 mx-2 flex flex-col align-bottom justify-center items-center">
                <Image src = {fullBookedIcon} alt="Fully Booked Icon" className="mb-10"/>
                <p className="flex justify-center items-end">{room.roomID}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default FloorPlan;
