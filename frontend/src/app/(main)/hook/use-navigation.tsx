"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

const useNavigation = () => {
  const pathname = usePathname();
  const [isRoomBookingActive, setRoomBookingActive] = useState(false);
  const [isMyBookingActive, setMyBookingActive] = useState(false);
  const [isProfileActive, setProfileActive] = useState(false);
  const [isBookingRequestActive, setBookingRequestActive] = useState(false);
  const [isAllBookingActive, setAllBookingActive] = useState(false);
  const [isUploadActive, setUploadActive] = useState(false);

  useEffect(() => {
    setRoomBookingActive(false);
    setMyBookingActive(false);
    setProfileActive(false);
    setBookingRequestActive(false);
    setAllBookingActive(false);
    setUploadActive(false);

    switch (pathname) {
      case "/roombooking":
        setRoomBookingActive(true);
        break;
      case "/mybooking":
        setMyBookingActive(true);
        break;
      case "/profile":
        setProfileActive(true);
        break;
      case "/bookingrequest":
        setBookingRequestActive(true);
        break;
      case "/allbookings":
        setAllBookingActive(true);
        break;
      case "/upload":
        setUploadActive(true);
        break;
      default:
        // Handle any other cases here
        break;
    }
  }, [pathname]);

  return {
    isRoomBookingActive,
    isMyBookingActive,
    isProfileActive,
    isBookingRequestActive,
    isAllBookingActive,
    isUploadActive,
  };
};

export default useNavigation;
