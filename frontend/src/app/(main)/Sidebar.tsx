"use client";

import roomBookingLight from "../../../public/Sidebar-icon/Room Booking Light.svg";
import roomBookingDark from "../../../public/Sidebar-icon/Room Booking Dark.svg";
import myBookingDark from "../../../public/Sidebar-icon/My Booking Dark.svg";
import myBookingLight from "../../../public/Sidebar-icon/My Booking Light.svg";
import profileDark from "../../../public/Sidebar-icon/Profile Dark.svg";
import profileLight from "../../../public/Sidebar-icon/Profile Light.svg";
import bookingRequestDark from "../../../public/Sidebar-icon/Booking Request Dark.svg";
import bookingRequestLight from "../../../public/Sidebar-icon/Booking Request Light.svg";
import feedbackLight from "../../../public/Sidebar-icon/Feedback Light.svg";
import feedbackDark from "../../../public/Sidebar-icon/Feedback Dark.svg";
import graphStatisticsDark from "../../../public/Sidebar-icon/Graph Statistics Dark.svg"
import graphStatisticsLight from "../../../public/Sidebar-icon/Graph Statistics Light.svg"
import viewfeedbackDark from "../../../public/Sidebar-icon/ViewFeedBack Dark.svg";
import viewfeedbackLight from "../../../public/Sidebar-icon/ViewFeedBack Light.svg";
import useNavigation from "./hook/use-navigation";
import uploadDark from "../../../public/Sidebar-icon/Upload Dark.svg";
import uploadLight from "../../../public/Sidebar-icon/Upload Light.svg";

import Image from "next/image";
import companylogo from "../../../public/Company-logo/Company Logo.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import getEmailFromSessionStorage from "../Components/CommonFunction";

const Sidebar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const {
    isRoomBookingActive,
    isMyBookingActive,
    isProfileActive,
    isBookingRequestActive,
    isAllBookingActive,
    isGraphStatisticActive,
    isUploadActive,
    isViewFeedbackActive,
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

  const buttonActiveStyle =
    "flex flex-row py-1 bg-primary-200 rounded-md items-center";
  const buttonInactiveStyle = "flex flex-row py-1 rounded-md items-center";

  const textActiveStyle =
    "text-base items-center text-gray-800 float-left font-normal font-Inter ";
  const textInactiveStyle =
    "text-base items-center text-gray-500 float-left font-normal font-Inter";

  const iconStyle = "mx-2 w-7 h-10 justify-center p-0.5";

  return (
    <div>
      <div className="relative top-0 flex flex-col h-screen bg-[#fefefe] ">
        <Link href="https://www.southampton.ac.uk/my/index.page">
          <Image
            src={companylogo}
            alt="Company Logo"
            className="object-contain pt-[20px] px-5 pb-[20px] flex items-center"
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
                <span className={`${textActiveStyle}`}>Room Booking</span>
              </div>
            ) : (
              <div className={`${buttonInactiveStyle}`}>
                <Image
                  src={roomBookingLight}
                  alt="Room Booking Light"
                  className={`${iconStyle}`}
                />
                <span className={`${textInactiveStyle}`}>Room Booking</span>
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
                  className={`${iconStyle} `}
                />
                <span className={`${textActiveStyle}`}>My Booking</span>
              </div>
            ) : (
              <div className={`${buttonInactiveStyle}`}>
                <Image
                  src={myBookingLight}
                  alt="My Booking Light"
                  className={`${iconStyle}`}
                />
                <span className={`${textInactiveStyle}`}>My Booking</span>
              </div>
            )}
          </Link>
          {isAdmin && (
            <Link
              href="/bookingrequest"
              className="space-x-2 mx-3 duration-200 hover:shadow-lg m-2 rounded-md"
            >
              {isBookingRequestActive ? (
                <div className={`${buttonActiveStyle}`}>
                  <Image
                    src={bookingRequestDark}
                    alt="Booking Request Dark"
                    className={`${iconStyle} `}
                  />
                  <span className={`${textActiveStyle}`}>Booking Request</span>
                </div>
              ) : (
                <div className={`${buttonInactiveStyle}`}>
                  <Image
                    src={bookingRequestLight}
                    alt="Booking Request Light"
                    className={`${iconStyle}`}
                  />
                  <span className={`${textInactiveStyle}`}>
                    Booking Request
                  </span>
                </div>
              )}
            </Link>
          )}
          {isAdmin && (
            <Link
              href="/allbookings"
              className="space-x-2 mx-3 duration-200 hover:shadow-lg m-2 rounded-md"
            >
              {isAllBookingActive ? (
                <div className={`${buttonActiveStyle}`}>
                  <Image
                    src={feedbackDark}
                    alt="All Booking Dark"
                    className={`${iconStyle} `}
                  />
                  <span className={`${textActiveStyle}`}>All Bookings</span>
                </div>
              ) : (
                <div className={`${buttonInactiveStyle}`}>
                  <Image
                    src={feedbackLight}
                    alt="All Booking Light"
                    className={`${iconStyle}`}
                  />
                  <span className={`${textInactiveStyle}`}>All Bookings</span>
                </div>
              )}
            </Link>
          )}
          {isAdmin && (
            <Link
              href="/graphstatistics"
              className="space-x-2 mx-3 duration-200 hover:shadow-lg m-2 rounded-md"
            >
              {isGraphStatisticActive ? (
                <div className={`${buttonActiveStyle}`}>
                  <Image
                    src={graphStatisticsDark}
                    alt="Graph Statistics Dark"
                    className={`${iconStyle} pt-1.5 pb-1.5 animate-vote duration-200`}
                  />
                  <span className={`${textActiveStyle}`}>Graph Statistics</span>
                </div>
              ) : (
                <div className={`${buttonInactiveStyle}`}>
                  <Image
                    src={graphStatisticsLight}
                    alt="Graph Statistics Light"
                    className={`${iconStyle} pt-1.5 pb-1.5`}
                  />
                  <span className={`${textInactiveStyle}`}>Graph Statistics</span>
                </div>
              )}
            </Link>
          )}
          {isAdmin && (
            <Link
              href="/upload"
              className="space-x-2 mx-3 duration-200 hover:shadow-lg m-2 rounded-md"
            >
              {isUploadActive ? (
                <div className={`${buttonActiveStyle}`}>
                  <Image
                    src={uploadDark}
                    alt="Upload Dark"
                    className={`${iconStyle} animate-vote duration-200`}
                  />
                  <span className={`${textActiveStyle}`}>Upload</span>
                </div>
              ) : (
                <div className={`${buttonInactiveStyle}`}>
                  <Image
                    src={uploadLight}
                    alt="Upload Light"
                    className={`${iconStyle}`}
                  />
                  <span className={`${textInactiveStyle}`}>Upload</span>
                </div>
              )}
            </Link>
          )}
              

          {isAdmin && (
            <Link
              href="/viewfeedback"
              className="space-x-2 mx-3 duration-200 hover:shadow-lg m-2 rounded-md"
            >
              {isViewFeedbackActive ? (
                <div className={`${buttonActiveStyle}`}>
                  <Image
                    src={viewfeedbackDark}
                    alt="View Feedback Dark"
                    className={`${iconStyle}`}
                  />
                  <span className={`${textActiveStyle}`}>View Feedback</span>
                </div>
              ) : (
                <div className={`${buttonInactiveStyle}`}>
                  <Image
                    src={viewfeedbackLight}
                    alt="View Feedback Light"
                    className={`${iconStyle}`}
                  />
                  <span className={`${textInactiveStyle}`}>View Feedback</span>
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
                  className={`${iconStyle} animate-vote duration-200`}
                />
                <span className={`${textActiveStyle}`}>Profile</span>
              </div>
            ) : (
              <div className={`${buttonInactiveStyle}`}>
                <Image
                  src={profileLight}
                  alt="Profile Light"
                  className={`${iconStyle}`}
                />
                <span className={`${textInactiveStyle}`}>Profile</span>
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
