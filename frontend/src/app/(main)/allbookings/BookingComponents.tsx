"use client";
import React, { useState } from "react";
import BookingsTable from "./BookingsTable";
import DetailsBar from "./DetailsBar";
import TableFooter from "./TablePager";
import { useStateContext } from "./BookingContext";

const RequestComponents = () => {
  const { selectedRowIndex } = useStateContext();
  const isSelected = selectedRowIndex >= 0;

  return (
    <div className="flex h-full" style={{ maxHeight: "75vh" }}>
      <div
        className={`flex flex-col ml-10 mr-5 mt-5 transition-width duration-500 ${isSelected ? "w-2/3" : "w-full"}`}
      >
        <TableFooter />
        <BookingsTable />
      </div>
      <div
        className={`flex mt-5 overflow-y-auto overflow-x-hidden flex-shrink-0 transform transition-transform duration-500 ${isSelected ? "pl-5 border-l border-black-100 translate-x-0 mr-5 w-1/3" : "translate-x-full"}`}
      >
        {isSelected && <DetailsBar />}
      </div>
    </div>
  );
};
export default RequestComponents;
