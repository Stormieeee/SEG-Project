"use client";

import React, { useEffect, useState } from "react";
import DateTime from "./Date and Time Components/DateAndTime";
import Description from "./DescriptionComponents/Description";
import FloorPlan from "./Floorplan Components/FloorPlan";
import RoomSpecifics from "./RoomSpecificsComponents/RoomSpecifics";
import RoomStatusKey from "./RoomStatusComponents/StatusComponents";

export default function RoomBooking() {
  const [fetchedData, setFetchedData] = useState(null);
  const [endValue, setEndValue] = useState<number>(new Date().getHours()+1);
  const [startValue, setStartValue] = useState<number>(9); 

  const getCurrentDate = (): string => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed, so add 1
    const day = currentDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const convertHourToHHMM = (hour: number): [number, number] => {
    const minute = 0; // Since we're converting from HH to HH:MM, minute will be 0
    return [hour, minute];
  };
  const formatHour = (value: number): string => {
    // Pad single-digit hours with leading zero and return as HH:00
    return value.toString().padStart(2, "0") + ":00";
  };
  const adjustTime = (hour: number): string => {
    const [hours, minute] = convertHourToHHMM(hour);

    // Convert hour and minute to minutes and subtract 1
    let adjustedTime = hours * 60 + minute - 1;

    // Ensure adjustedTime does not go below 0
    if (adjustedTime < 0) {
      adjustedTime = 0;
    }

    // Convert adjustedTime back to "HH:MM" format
    const adjustedHour = Math.floor(adjustedTime / 60);
    const adjustedMinute = adjustedTime % 60;
    const formattedTime = `${adjustedHour.toString().padStart(2, "0")}:${adjustedMinute.toString().padStart(2, "0")}`;
    return formattedTime;
  };
  const fetchData = async () => {
   var currDate = getCurrentDate()
   var currStartTime = formatHour(new Date().getHours())
   var currEndTime = adjustTime(endValue)
    // Check if OTP is correct
    try {
      const response = await fetch(
        "http://localhost:8000/check_room_availability/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: sessionStorage.getItem("userEmail"),
            capacity: 40,
            sec: "3R",
            date: currDate,
            start_time: currStartTime,
            end_time: currEndTime,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setFetchedData(data);
        console.log(currDate)
      } else {
        // OTP verification failed
        console.log("Check Availability Failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() =>{
    fetchData();
  }, []);
  
  const handleSelectStartTime = (value : any) =>{ 
    setStartValue(parseInt(value));
  }

  const handleSelectEndTime = (value: any) =>{ 
    setEndValue(parseInt(value));
  }  
 
  return (
    <div className="flex flex-row">
      <div className="w-1/2 flex flex-col h-full">
        <div className="h-1/2 p-1 mt-[10px] ml-[15px]">
          <DateTime fetchData={fetchData} onSelectStartTime ={handleSelectStartTime} onSelectEndTime = {handleSelectEndTime}/>
        </div>
        <div className="h-full p-1 mt-[10px] ml-[15px]">
          <RoomSpecifics />
        </div>
      </div>

      <div className="w-1/2 flex flex-col">
        <div className="h-4/6 p-1 mt-[10px] ml-[5px]">
          <FloorPlan fetchedData = {fetchedData} />
        </div>
        <div className="h-2/6 flex">
          <div className="w-7/12 p-1 ml-[5px]">
            <Description />
          </div>
          <div className="w-5/12 p-1">
            <RoomStatusKey />
          </div>
        </div>
      </div>
    </div>
  );
}
