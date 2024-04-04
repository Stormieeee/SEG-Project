"use client";
import React from "react";
import Sortbar from "./Sortbar";
import SearchBar from "./SearchBar";
import RequestComponents from "./RequestComponents";
import { StateProvider } from "./RequestContext";

const BookingRequestPage = () => {
  return (
    <StateProvider>
      <div className="flex flex-1 flex-col">
        <div className="h-10 flex mt-3 items-center justify-center relative">
          <Sortbar />
          <SearchBar />
        </div>
        <RequestComponents />
      </div>
    </StateProvider>
  );
};
export default BookingRequestPage;
