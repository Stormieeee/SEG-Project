"use client";
import React from "react";
import Sortbar from "./Sortbar";
import SearchBar from "./SearchBar";
import RequestComponents from "./BookingComponents";
import BookingSwitcher from "./BookingSwitcher";
import { StateProvider } from "./BookingContext";
import { useStateContext } from "./BookingContext";
import LoadingPage from "@/app/loader/LoadingPage";

const BookingRequestPage = () => {
  const { isLoading } = useStateContext();
  return (
    <StateProvider>
      <div className="flex flex-1 flex-col">
        <div className="relative flex h-10 mt-3 px-10 items-center justify-between">
          <Sortbar />
          <BookingSwitcher />
          <SearchBar />
        </div>
        <RequestComponents />
      </div>
      {isLoading && <LoadingPage />}
    </StateProvider>
  );
};
export default BookingRequestPage;
