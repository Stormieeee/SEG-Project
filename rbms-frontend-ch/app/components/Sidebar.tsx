// const Sidebar = () => {
//   return (
//     <div className="flex bg-white border-r border-gray-300 h-screen relative w-56">
//       <div className="h-3/4">
//         <img
//           src="../Company-logo/Company Logo.svg"
//           className="border-b border-gray-300 absolute top-0 p-4"
//         />
//       </div>

//       <div className="bg-white border-t border-gray-300 absolute bottom-0 w-full h-1/4">
//         {/*bottom box content in sidebar*/}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

//------------------------------------------------------------------------------------------------

"use client";

import { Icon } from "@iconify/react";

import roomBookingLight from "../../public/Sidebar-icon/Room Booking Light.svg";
import roomBookingDark from "../../public/Sidebar-icon/Room Booking Dark.svg";
import myBookingDark from "../../public/Sidebar-icon/My Booking Dark.svg";
import myBookingLight from "../../public/Sidebar-icon/My Booking Light.svg";
import profileDark from "../../public/Sidebar-icon/Profile Dark.svg";
import profileLight from "../../public/Sidebar-icon/Profile Light.svg";
import useNavigation from "../hook/use-navigation";

import Image from "next/image";
import companylogo from "../../public/Company-logo/Company Logo.svg";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const { isRoomBookingActive, isMyBookingActive, isProfileActive } =
    useNavigation();

  const pathname = usePathname();

  const buttonAttr =
    "group bg-white mt-[22px] mx-5 py-2 pr-10 h-[43px] w-[200px] flex flex-col  focus:bg-sky-300 hover:shadow-lg hover:translate-x-1 hover:ease-in transition duration-150 ease-out";
  const logoAttr =
    "float-start  mx-3 object-contain h-5 w-6 group-focus:text-zinc-800 text-stone-500 overflow-hidden whitespace-nowrap";
  const textAttr =
    "group-focus:text-zinc-800 float-left text-stone-500 text-base font-normal font-Inter";

  return (
    <>
      <div className="flex flex-col h-screen bg-white-50 border-zinc-200 md:flex">
        <Link href="https://www.southampton.ac.uk/my/index.page">
          <Image
            src={companylogo}
            alt="Company Logo"
            className="object-contain w-25 pt-[30px] px-[30px] pb-[10px] flex items-center"
          />
        </Link>
        <div className="bg-white-600 mx-2.5 h-[1px]"></div>
        <Link
          href="/roombooking"
          className="flex flex-row space-x-2 items-center mx-4 py-2 relative duration-200 hover:shadow-md hover:translate-x-1"
        >
          {isRoomBookingActive ? (
            <Image src={roomBookingDark} alt="Room Booking Dark" className="" />
          ) : (
            <Image src={roomBookingLight} alt="Room Booking Dark" />
          )}
          <span
            className={`text-xl pt-2 flex md:flex ${
              isRoomBookingActive
                ? "text-zinc-800 float-left text-base font-normal font-Inter"
                : " text-stone-500"
            }`}
          >
            Room Booking
          </span>
          {/* <span className='h-2 w-2 rounded-full bg-sky-500 absolute top-3 right-[16px] md:right-[100px]'></span> */}
        </Link>

        <Link
          href="/mybooking"
          className="flex flex-row space-x-2 items-center mx-4 py-2 relative duration-200 hover:shadow-md hover:translate-x-1"
        >
          {isMyBookingActive ? (
            <Image src={myBookingDark} alt="My Booking Dark" />
          ) : (
            <Image src={myBookingLight} alt="My Booking Light" />
          )}
          <span
            className={`text-xl pt-2 flex md:flex ${
              isMyBookingActive
                ? "text-zinc-800 float-left text-base font-normal font-Inter"
                : " text-stone-500"
            }`}
          >
            My Booking
          </span>
          {/* <span className='h-2 w-2 rounded-full bg-sky-500 absolute top-3 right-[16px] md:right-[100px]'></span> */}
        </Link>

        <Link
          href="/profile"
          className="flex flex-row space-x-4 items-center px-4 py-3 relative duration-200   hover:shadow-md hover:translate-x-1"
        >
          {isProfileActive ? (
            <Image src={profileDark} alt="My Booking Dark" />
          ) : (
            <Image src={profileLight} alt="My Booking Light" />
          )}
          <span
            className={`text-xl pt-2 flex md:flex ${
              isProfileActive
                ? "text-zinc-800 float-left text-base font-normal font-Inter"
                : " text-stone-500"
            }`}
          >
            Profile
          </span>
          {/* <span className='h-2 w-2 rounded-full bg-sky-500 absolute top-3 right-[16px] md:right-[100px]'></span> */}
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
