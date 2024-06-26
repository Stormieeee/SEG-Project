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
import FloorplanError from "../errorHandling/FloorplanError";
import Loader from "@/app/loader/RoomBookingLoading";
import { LoadingState } from "../hook/loadingState";

export default function RoomBooking() {
  
  const{startLoading, stopLoading , isLoading} = LoadingState();

  const {
    setRoomID,
    capacity,
    setCapacity,
    setDescription,
    date,
    startTime,
    endTime,
    floor,
    floorSection,
    dataFromApi,
    setFetchedData,
  } = useStateContext();

  const fetchData = async () => {
    try {
      const data = await getDataFromServer(
        date,
        formatHour(startTime),
        adjustTime(endTime),
        capacity,
        floor,
        floorSection
      );
      setFetchedData(data);
      stopLoading();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    startLoading();
    fetchData(); // Fetch data when component mounts
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-row">
      <div className="w-1/2 flex flex-col">
        <div className="p-1 mt-[10px] ml-[15px]">
          <DateTime fetchData={fetchData} />
        </div>

        <div className="p-1 mt-[10px] ml-[15px]">
          <RoomSpecifics
            setSpecifics={setDescription}
            setCapacity={setCapacity}
          />
        </div>
      </div>

      <div className=" w-1/2 flex flex-col mr-4">
        <div className="h-4/6 p-1 mt-[10px] ml-[5px]">
          {dataFromApi ? (
            <FloorPlan dataFromApi={dataFromApi} setRoomID={setRoomID} />
          ) : (
            <div className="justify-center items-center flex">
              <FloorplanError />
            </div>
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
