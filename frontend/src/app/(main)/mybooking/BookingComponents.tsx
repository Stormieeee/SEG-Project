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
      <div
        className={`flex h-full overflow-y-auto flex-shrink-0 transform transition-transform duration-500 ${isSelected ? "pl-5 translate-x-0 border-l border-black-100 mr-5 w-1/3" : "translate-x-full"}`}
      >
        {isSelected && <DetailsBar />}
      </div>
    </div>
  );
};

export default BookingComponents;
