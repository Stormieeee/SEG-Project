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

  const buttonActiveStyle = "flex flex-row py-1.5 bg-primary-200 rounded-md items-center";
  const buttonInactiveStyle =  "flex flex-row py-1.5 rounded-md items-center";

  const textActiveStyle = "text-md items-center text-gray-800 float-left font-normal font-Inter ";
  const textInactiveStyle = "text-md items-center text-gray-500 float-left font-normal font-Inter";

  const iconStyle = "mx-2 w-7 justify-center p-0.5"

  return (
    <>
      <div className=" relative top-0 flex flex-col h-screen bg-white-50 ">
        <Link href="https://www.southampton.ac.uk/my/index.page">
          <Image
            src={companylogo}
            alt="Company Logo"
            className="object-contain w-25 pt-[20px] px-[30px] pb-[20px] flex items-center"
            width={0}
            height={0}
          />
        </Link>
        <div className="bg-white-600 mx-2.5 h-[1px] mb-4"></div>
        <div className="justify-items-center flex flex-col">
          <Link
            href="/roombooking"
            className="space-x-2 mx-3 duration-200 hover:shadow-lg m-2 rounded-md"
          >
            {isRoomBookingActive ? (
              <div className={`${buttonActiveStyle}`}>
                <Image
                  src={roomBookingDark}
                  alt="Room Booking Dark"
                  className={`${iconStyle} animate-vote duration-200`}
                />
                <span className={`${textActiveStyle}`}>
                  Room Booking
                </span>
              </div>
            ) : (
              <div className={`${buttonInactiveStyle}`}>
                <Image
                  src={roomBookingLight}
                  alt="Room Booking Light"
                  className={`${iconStyle}`}
                />
                <span className={`${textInactiveStyle}`}>
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
              <div className={`${buttonActiveStyle}`}>
                <Image
                  src={myBookingDark}
                  alt="My Booking Dark"
                  className={`${iconStyle}`}
                />
                <span className={`${textActiveStyle}`}>
                  My Booking
                </span>
              </div>
            ) : (
              <div className={`${buttonInactiveStyle}`}>
                <Image
                  src={myBookingLight}
                  alt="My Booking Light"
                  className={`${iconStyle}`}
                />
                <span className={`${textInactiveStyle}`}>
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
                <div className= {`${buttonActiveStyle}`}>
                  <Image
                    src={bookingRequestDark}
                    alt="Booking Request Dark"
                    className={`${iconStyle} h-7`}
                  />
                  <span className={`${textActiveStyle}`}>
                    Booking Request
                  </span>
                </div>
              ) : (
                <div className= {`${buttonInactiveStyle}`}>
                  <Image
                    src={bookingRequestLight}
                    alt="Booking Request Light"
                    className={`${iconStyle} h-7 `}
                  />
                  <span className={`${textInactiveStyle}`}>
                    Booking Request
                  </span>
                </div>
              )}
            </Link>
          )}
        </div>

        <div className=" bottom-4 w-full flex flex-col absolute">
          <div className="flex flex-col bg-white-600 mx-4 h-[1px]"></div>
          <Link
            href="/profile"
            className=" static bottom-0 space-x-2 mx-3 m-2 pt-2 duration-200 hover:shadow-lg rounded-md"
          >
            {isProfileActive ? (
              <div className={`${buttonActiveStyle}`}>
                <Image
                  src={profileDark}
                  alt="Profile Dark"
                  className={`${iconStyle}`}
                />
                <span className={`${textActiveStyle}`}>
                  Profile
                </span>
              </div>
            ) : (
              <div className= {`${buttonInactiveStyle}`}>
                <Image
                  src={profileLight}
                  alt="Profile Light"
                  className={`${iconStyle}`}
                />
                <span className={`${textInactiveStyle}`}>
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