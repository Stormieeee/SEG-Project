"use client";
import ConfirmButton from "./roombooking/TopbarComponent/ConfirmButton";
import FloorSectorSelector from "./roombooking/TopbarComponent/FloorSectorSelector";

import { usePathname } from "next/navigation";
import { useStateContext } from "./StateContext";
import { handleRoomBooking } from "./roombooking/utils/utils";
import { formatHour, adjustTime } from "./roombooking/utils/commonFunction";
import { useState } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
const getPageTitle = (path: string): string => {
  switch (path) {
    case "/roombooking":
      return "Room Booking";
    case "/mybooking":
      return "My Booking";
    case "/profile":
      return "Profile";
    case "/bookingrequest":
      return "Booking Request";
    default:
      return "Default Title";
  }
};

const Topbar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { roomID, capacity, description, date, startTime, endTime } =
    useStateContext();

  const handleButtonPress = (
    roomID: any,
    capacity: number,
    description: any,
    date: string,
    startTime: any,
    endTime: any
  ) => {
    setIsLoading(true);
    try {
      const status = handleRoomBooking(
        roomID,
        capacity,
        description,
        date,
        formatHour(startTime),
        adjustTime(endTime)
      );
      alert("Booking successful");
    } catch (error) {
      console.log("handle room booking failure: " + error);
    }
    setIsLoading(false);
  };

  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  return (
    <div className="flex w-full bg-white-50 items-center p-5 shadow-md mb-[10px]">
      <div className="flex flex-row w-full justify-between ">
        <h1 className="text-2xl font-bold text-stone-800 antialiased">
          {pageTitle}
        </h1>
        {pathname === "/roombooking" && (
          <div className="flex flex-auto justify-end items-center">

            <FloorSectorSelector />

            <div className="ml-4">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <ConfirmButton
                  onClick={() =>
                    handleButtonPress(
                      roomID,
                      capacity,
                      description,
                      date,
                      startTime,
                      endTime
                    )
                  }
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
