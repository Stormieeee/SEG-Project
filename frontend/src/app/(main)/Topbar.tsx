"use client";
import ConfirmButton from "./roombooking/ConfirmButton";
import { usePathname } from "next/navigation";

const getPageTitle = (path: string): string => {
  switch (path) {
    case '/roombooking':
      return 'Room Booking';
    case '/mybooking':
      return 'My Booking';
    case '/profile':
      return 'Profile';
    default:
      return 'Default Title';
  }
};

const Topbar = () => {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  return (
    <div className="flex w-full h-[95px] bg-white border-b border-gray-300 items-center p-5 shadow-md mb-[10px]">
      <div className="flex w-full justify-between">
        <h1 className="font-bold text-2xl">{pageTitle}</h1>
        {pathname === "/roombooking" && <ConfirmButton />}
      </div>
    </div>
  );
};

export default Topbar;
