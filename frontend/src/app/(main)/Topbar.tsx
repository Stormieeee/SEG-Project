"use client";
import ConfirmButton from "./roombooking/ConfirmButton";
import { usePathname } from "next/navigation";


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
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  return (
    <div className="flex w-full bg-white-50 items-center p-5 shadow-md mb-[10px]">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-bold text-stone-800 antialiased">{pageTitle}</h1>
        {pathname === "/roombooking" && <ConfirmButton />}
      </div>
    </div>
  );
};

export default Topbar;
