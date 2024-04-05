"use client";
import React, { useEffect, useState } from "react";
import DateTime from "./Date and Time Components/DateAndTime";
import Description from "./DescriptionComponents/Description";
import FloorPlan from "./Floorplan Components/FloorPlan";
import RoomSpecifics from "./RoomSpecificsComponents/RoomSpecifics";
import RoomStatusKey from "./RoomStatusComponents/StatusComponents";
import { getDataFromServer } from "./utils/utils";
import { useStateContext } from "../StateContext";
import { formatHour, adjustTime } from "./utils/commonFunction";

export default function RoomBooking() {
  const [dataFromApi, setFetchedData] = useState(null);

  const {
    setRoomID,
    capacity,
    setCapacity,
    setDescription,
    date,
    startTime,
    endTime,
  } = useStateContext();


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



  return (
    <div className="flex flex-row">
      <div className="w-1/2 flex flex-col">
        <div className="p-1 mt-[10px] ml-[15px]">
          <DateTime
            fetchData={fetchData}
          />
        </div>
        <div className="p-1 mt-[10px] ml-[15px]">
          <RoomSpecifics
            setSpecifics={setDescription}
            setCapacity={setCapacity}
          />
        </div>
      </div>

      <div className=" w-1/2 flex flex-col">
        <div className="h-4/6 p-1 mt-[10px] ml-[5px]">
          {dataFromApi ? (
            <FloorPlan dataFromApi={dataFromApi} setRoomID={setRoomID} />
          ) : (
            <div className="justify-center items-center flex">Loading... </div>
          )}
        </div>
        <div className="h-2/6 flex flex-row">
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