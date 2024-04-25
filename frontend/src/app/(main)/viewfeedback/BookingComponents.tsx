"use client";
import React from "react";
import BookingsTable from "./BookingsTable";
import DetailsBar from "./DetailsBar";
import { useStateContext } from "./MyBookingContext";

const BookingComponents = () => {
  const { selectedRowIndex } = useStateContext();
  const isSelected = selectedRowIndex >= 0;

  return (
    <div className="flex h-full" style={{ maxHeight: "75vh" }}>
      <div
        className={`flex flex-col ml-10 mr-5 h-full transition-width duration-500 ${isSelected ? "w-2/3" : "w-full"}`}
      >
        <BookingsTable />
      </div>
      {isSelected && (
        <div
          className={`flex pl-5 h-full overflow-y-auto flex-shrink-0 border-l border-black-100 transform transition-transform duration-500 translate-x-0 mr-5 w-1/3`}
        >
          <DetailsBar />
        </div>
      )}
    </div>
  );
};

export default BookingComponents;