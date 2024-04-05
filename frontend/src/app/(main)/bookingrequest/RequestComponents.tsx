"use client";
import React, { useState } from "react";
import RequestTable from "./RequestTable";
import DetailsBar from "./DetailsBar";
import TableFooter from "./TablePager";
import { useStateContext } from "./RequestContext";

const RequestComponents = () => {
  const { selectedRowIndex } = useStateContext();
  const isSelected = selectedRowIndex >= 0;
  const [requestDetails, setRequestDetails] = useState<{
    bookingId: string;
    user_id: string;
    user_role: string;
    request_capacity: number;
    room_capacity: number;
    description: string;
  } | null>(null);

  return (
    <div className="flex h-full" style={{ maxHeight: "75vh" }}>
      <div
        className={`flex flex-col ml-10 mr-5 mt-5 transition-width duration-500 ${isSelected ? "w-2/3" : "w-full"}`}
      >
        <TableFooter />
        <RequestTable setRequestDetails={setRequestDetails} />
      </div>
      <div
        className={`flex pl-5 mt-5 overflow-y-auto flex-shrink-0 border-l border-black-100 transform transition-transform duration-500 ${isSelected ? "translate-x-0 mr-5 w-1/3" : "translate-x-full"}`}
      >
        {isSelected && <DetailsBar {...requestDetails} />}
      </div>
    </div>
  );
};
export default RequestComponents;
