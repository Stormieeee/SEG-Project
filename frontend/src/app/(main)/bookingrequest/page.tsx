"use client";
import React from "react";
import Sortbar from "./Sortbar";
import SearchBar from "./SearchBar";
import RequestComponents from "./RequestComponents";
import { StateProvider } from "./RequestContext";
import { useStateContext } from "./RequestContext";
import LoadingPage from "@/app/loader/LoadingPage";

const BookingRequestPage = () => {
  const { isLoading } = useStateContext();
  return (
    <StateProvider>
      <div className="flex flex-1 flex-col">
        <div className="relative h-10 flex mt-3 items-center">
          <div className="absolute left-0 ml-10">
            <Sortbar />
          </div>
          <div className="flex-grow flex items-center justify-center">
            <SearchBar />
          </div>
        </div>
        <RequestComponents />
      </div>
      {isLoading && <LoadingPage />}
    </StateProvider>
  );
};
export default BookingRequestPage;
