"use client";


import roomBookingLight from "../../../public/Sidebar-icon/Room Booking Light.svg";
import roomBookingDark from "../../../public/Sidebar-icon/Room Booking Dark.svg";
import myBookingDark from "../../../public/Sidebar-icon/My Booking Dark.svg";
import myBookingLight from "../../../public/Sidebar-icon/My Booking Light.svg";
import profileDark from "../../../public/Sidebar-icon/Profile Dark.svg";
import profileLight from "../../../public/Sidebar-icon/Profile Light.svg";
import bookingRequestDark from "../../../public/Sidebar-icon/Booking Request Dark.svg";
import bookingRequestLight from "../../../public/Sidebar-icon/Booking Request Light.svg";
import useNavigation from "./hook/use-navigation";

import Image from "next/image";
import companylogo from "../../../public/Company-logo/Company Logo.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import getEmailFromSessionStorage from "../../../src/app/Components/CommonFunction";

const Sidebar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const {
    isRoomBookingActive,
    isMyBookingActive,
    isProfileActive,
    isBookingRequestActive,
    
  } = useNavigation();
  const checkRole = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/check_approval_role/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ UserID: getEmailFromSessionStorage() }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setIsAdmin(data);
        console.log("Role:", data);
      } else {
        console.error("Failed to get role");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    checkRole();
  }, []);

  return (
    <>
      <div className=" relative top-0 flex flex-col h-screen bg-white-50 border-zinc-200 ">
        <Link href="https://www.southampton.ac.uk/my/index.page">
          <Image
            src={companylogo}
            alt="Company Logo"
            className="object-contain w-25 pt-[30px] px-[30px] pb-[10px] flex items-center"
            width={0}
            height={0}
          />
        </Link>
        <div className="bg-white-600 mx-2.5 h-[1px] mb-16"></div>
        <div className="justify-items-center flex flex-col">
          <Link
            href="/roombooking"
            className=" space-x-2 mx-3 duration-200 hover:shadow-lg m-2 rounded-md"
          >
            {isRoomBookingActive ? (
              <div className="flex flex-row py-2 bg-primary-200 rounded-md">
                <Image
                  src={roomBookingDark}
                  alt="Room Booking Dark"
                  className="mx-2 w-10 justify-center p-0.5 animate-vote duration-200"
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
                  className="mx-2 w-10 justify-center p-0.5"
                />
                <span className="text-lg items-center text-stone-500 float-left font-normal font-Inter">
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
                  className="mx-2 w-10 justify-center p-0.5 animate-vote duration-200"
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
                  className="mx-2 w-10 justify-center p-0.5"
                />
                <span className="text-lg  items-center text-stone-500 float-left font-normal font-Inter">
                  My Booking
                </span>
              </div>
            )}
          </Link>
          {isAdmin && (
            <Link
              href="/bookingrequest"
              className="space-x-2 mx-3 duration-200 hover:shadow-lg m-2 rounded-md"
            >
              {isBookingRequestActive ? (
                <div className="flex flex-row py-2 bg-primary-200 rounded-md">
                  <Image
                    src={bookingRequestDark}
                    alt="Booking Request Dark"
                    className="mx-2 w-10 justify-center p-0.5 animate-vote duration-200"
                  />
                  <span className=" text-lg items-center text-zinc-800 float-left font-normal font-Inter ">
                    Booking Request
                  </span>
                </div>
              ) : (
                <div className="flex flex-row py-2 rounded-md">
                  <Image
                    src={bookingRequestLight}
                    alt="Booking Request Light"
                    className="mx-2 w-10 justify-center p-0.5"
                  />
                  <span className="text-lg items-center text-stone-500 float-left font-normal font-Inter">
                    Booking Request
                  </span>
                </div>
              )}
            </Link>
          )}
        </div>

        <div className=" bottom-0 w-full flex flex-col absolute">
          <div className="flex flex-col bg-white-600 mx-2.5 h-[2px]"></div>
          <Link
            href="/profile"
            className=" static bottom-0 space-x-2 mx-3 duration-200 hover:shadow-lg m-2 rounded-md"
          >
            {isProfileActive ? (
              <div className="flex flex-row py-1.5 bg-primary-200 rounded-md items-center">
                <Image
                  src={profileDark}
                  alt="Profile Dark"
                  className="mx-1 ml-2 w-10 justify-center p-0.5 animate-vote duration-200"
                />
                <span className=" text-lg items-center justify-center text-zinc-800 float-left font-normal font-Inter ">
                  Profile
                </span>
              </div>
            ) : (
              <div className="flex flex-row py-1.5 rounded-md items-center">
                <Image
                  src={profileLight}
                  alt="Profile Light"
                  className="mx-1 ml-2 w-10 justify-center p-0.5"
                />
                <span className="text-lg items-center text-stone-500 float-left font-normal font-Inter">
                  Profile
                </span>
              </div>
            )}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;