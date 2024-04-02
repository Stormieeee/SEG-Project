"use client";
import React, { useEffect, useState } from "react";
import DateTime from "./Date and Time Components/DateAndTime";
import Description from "./DescriptionComponents/Description";
import FloorPlan from "./Floorplan Components/FloorPlan";
import RoomSpecifics from "./RoomSpecificsComponents/RoomSpecifics";
import RoomStatusKey from "./RoomStatusComponents/StatusComponents";
import { getDataFromServer } from "./utils/utils";
import { useStateContext } from "../StateContext";
import ConfirmButton from "./ConfirmButton";

export default function RoomBooking() {
  const [dataFromApi, setFetchedData] = useState(null);

  const {
    roomID,
    setRoomID,
    capacity,
    setCapacity,
    setDescription,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
  } = useStateContext();

  const formatHour = (value: number): string => {
    // Pad single-digit hours with leading zero and return as HH:00:00
    return value.toString().padStart(2, "0") + ":00:00";
  };

  const adjustTime = (hour: number): string => {
    // Convert hour to minutes and subtract 1
    let adjustedTime = hour * 60 - 1;

    // Ensure adjustedTime does not go below 0
    adjustedTime = Math.max(adjustedTime, 0);

    // Convert adjustedTime back to "HH:MM" format
    const adjustedHour = Math.floor(adjustedTime / 60);
    const adjustedMinute = adjustedTime % 60;
    return `${adjustedHour.toString().padStart(2, "0")}:${adjustedMinute.toString().padStart(2, "0")}:00`;
  };

  const fetchData = async (
    date: string,
    startTime: number,
    endTime: number
  ) => {
    try {
      const data = await getDataFromServer(
        date,
        formatHour(startTime),
        adjustTime(endTime),
        capacity
      );
      setFetchedData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(date, startTime, endTime); // Fetch data when component mounts
  }, []);

  const handleSetStartTime = () => {
    setStartTime(startTime);
    console.log(startTime);
  };

  const handleSetEndTime = () => {
    setEndTime(endTime);
  };

  const handleSetDate = () =>{
    setDate(date)
  }


  return (
    <div className="flex flex-row">
      <div className="w-1/2 flex flex-col h-full">
        <div className="p-1 mt-[10px] ml-[15px]">
          <DateTime
            fetchData={fetchData}
            onSelectStartTime={handleSetStartTime}
            onSelectEndTime={handleSetEndTime}
            onSetDate={handleSetDate}
          />
        </div>
        <div className="p-1 mt-[10px] ml-[15px]">
          <RoomSpecifics
            setSpecifics={setDescription}
            setCapacity={setCapacity}
          />
        </div>
      </div>

      <div className=" w-full flex flex-col">
        <div className="h-4/6 p-1 mt-[10px] ml-[5px]">
          {dataFromApi ? (
            <FloorPlan dataFromApi={dataFromApi} setRoomID={setRoomID} />
          ) : (
            <div>Loading... </div>
          )}
        </div>
        <div className="flex flex-1 grow">
          <div className=" w-7/12 p-1 ml-[5px]">
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
