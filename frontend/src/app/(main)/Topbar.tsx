"use client";
import ConfirmButton from "./roombooking/ConfirmButton";
import { usePathname } from "next/navigation";
import { useStateContext } from "./StateContext";
import { handleRoomBooking } from "./roombooking/utils/utils";
import { formatHour, adjustTime } from "./roombooking/utils/commonFunction";
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
    try {
      const status = handleRoomBooking(
        roomID,
        capacity,
        description,
        date,
        formatHour(startTime),
        adjustTime(endTime)
      );
      console.log("Booking successful" + status);
    } catch (error) {
      console.log("handle room booking failure: " + error);
    }
  };

  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  return (
    <div className="flex w-full bg-white-50 items-center p-5 shadow-md mb-[10px]">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-bold text-stone-800 antialiased">
          {pageTitle}
        </h1>
        {pathname === "/roombooking" && (
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
  );
};

export default Topbar;
