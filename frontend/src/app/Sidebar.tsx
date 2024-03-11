"use client";

import { Icon } from "@iconify/react";

import roomBookingLight from "../../public/Sidebar-icon/Room Booking Light.svg";
import roomBookingDark from "../../public/Sidebar-icon/Room Booking Dark.svg";
import myBookingDark from "../../public/Sidebar-icon/My Booking Dark.svg";
import myBookingLight from "../../public/Sidebar-icon/My Booking Light.svg";
import profileDark from "../../public/Sidebar-icon/Profile Dark.svg";
import profileLight from "../../public/Sidebar-icon/Profile Light.svg";
import useNavigation from "./hook/use-navigation";

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
      <div className="fixed top-0 left-0 flex flex-col  h-screen bg-white-50 border-zinc-200 ">
        <Link href="https://www.southampton.ac.uk/my/index.page">
          <Image
            src={companylogo}
            alt="Company Logo"
            className="object-contain w-25 pt-[30px] px-[30px] pb-[10px] flex items-center"
          />
        </Link>
        <div className="bg-white-600 mx-2.5 h-[1px] mb-16"></div>
        <Link
          href="/roombooking"
          className=" space-x-2 mx-3 duration-200 hover:shadow-lg m-2 rounded-md"
        >
          {isRoomBookingActive ? (
            <div className="flex flex-row py-2 bg-primary-200 rounded-md">
              <Image
                src={roomBookingDark}
                alt="Room Booking Dark"
                className="mx-2 justify-center p-0.5 animate-vote duration-200"
              />
              <span className=" text-lg items-center text-zinc-800 float-left font-normal font-Inter ">
                Room Booking
              </span>
            </div>
          ) : (
            <div className="flex flex-row py-2 rounded-md">
              <Image
                src={roomBookingLight}
                alt="Room Booking Light"
                className="mx-2 justify-center p-0.5"
              />
              <span className="text-lg  items-center text-stone-500 float-left font-normal font-Inter">
                Room Booking
              </span>
            </div>
          )}
        </Link>

        <Link
          href="/mybooking"
          className="space-x-2 mx-3 duration-200 hover:shadow-lg m-2 rounded-md"
        >
          {isMyBookingActive ? (
            <div className="flex flex-row py-2 bg-primary-200 rounded-md">
              <Image
                src={myBookingDark}
                alt="My Booking Dark"
                className="mx-2 justify-center p-0.5"
              />
              <span className=" text-lg items-center text-zinc-800 float-left font-normal font-Inter ">
                My Booking
              </span>
            </div>
          ) : (
            <div className="flex flex-row py-2 rounded-md">
              <Image
                src={myBookingLight}
                alt="My Booking Light"
                className="mx-2 justify-center p-0.5"
              />
              <span className="text-lg  items-center text-stone-500 float-left font-normal font-Inter">
                My Booking
              </span>
            </div>
          )}
        </Link>

        <Link
          href="/profile"
          className=" static bottom-0 space-x-2 mx-3 duration-200 hover:shadow-lg m-2 rounded-md"
        >
          {isProfileActive ? (
            <div className="flex flex-row py-1.5 bg-primary-200 rounded-md">
              <Image
                src={profileDark}
                alt="Profile Dark"
                className="mx-1 ml-2 justify-center p-0.5"
              />
              <span className=" text-lg items-center text-zinc-800 float-left font-normal font-Inter ">
                Profile
              </span>
            </div>
          ) : (
            <div className="flex flex-row py-1.5 rounded-md">
              <Image
                src={profileLight}
                alt="Profile Light"
                className="mx-1 ml-2 justify-center p-0.5"
              />
              <span className="text-lg  items-center text-stone-500 float-left font-normal font-Inter">
                Profile
              </span>
            </div>
          )}
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
