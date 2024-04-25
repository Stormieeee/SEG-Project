"use client";
import React from "react";
import BookingSwitcher from "./BookingSwitcher";
import Sortbar from "./Sortbar";
import BookingComponents from "./BookingComponents";
import { StateProvider } from "./MyBookingContext";
import { useStateContext } from "./MyBookingContext";
import LoadingPage from "@/app/loader/LoadingPage";

const MyBookingPage = () => {
  const { isLoading } = useStateContext();
  return (
    <StateProvider>
      <div className="flex w-full h-full flex-col">
        <div className="relative flex h-10 mt-3 mb-5 items-center justify-center">
          <div className="absolute left-0 ml-10">
            <Sortbar />
          </div>
          <div className="flex-grow flex items-center justify-center">
            <BookingSwitcher />
          </div>
        </div>
        <div className="h-full">
          <BookingComponents />
        </div>
      </div>
      {isLoading && <LoadingPage />}
    </StateProvider>
  );
};
export default MyBookingPage;
