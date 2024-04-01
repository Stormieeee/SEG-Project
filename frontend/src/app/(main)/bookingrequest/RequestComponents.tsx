"use client";
import React, { useState } from "react";
import RequestTable from "./RequestTable";
import DetailsBar from "./DetailsBar";

interface RequestComponentsProps {
  searchTerm: string;
  selectedRowIndex: number;
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number>>;
  requests: string[][];
  setRequests: React.Dispatch<React.SetStateAction<string[][]>>;
  filteredRequests: string[][];
  setFilteredRequests: React.Dispatch<React.SetStateAction<string[][]>>;
}
const RequestComponents = ({
  searchTerm,
  selectedRowIndex,
  setSelectedRowIndex,
  requests,
  setRequests,
  filteredRequests,
  setFilteredRequests,
}: RequestComponentsProps) => {
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
    <div className="flex">
      <div
        className={`flex ml-10 mr-5 mt-5 overflow-y h-[550px] transition-width duration-500 ${isSelected ? "w-2/3" : "w-full"}`}
      >
        <RequestTable
          searchTerm={searchTerm}
          requests={requests}
          setRequestDetails={setRequestDetails}
          filteredRequests={filteredRequests}
          setFilteredRequests={setFilteredRequests}
          selectedRowIndex={selectedRowIndex}
          setSelectedRowIndex={setSelectedRowIndex}
        />
      </div>
      <div
        className={`flex pl-5 mt-5 overflow-y flex-shrink-0 border-l border-black-100 h-[550px] transform transition-transform duration-500 ${isSelected ? "translate-x-0 mr-5 w-1/3" : "translate-x-full"}`}
      >
        {isSelected && (
          <DetailsBar
            requests={requests}
            setRequests={setRequests}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            {...requestDetails}
          />
        )}
      </div>
    </div>
  );
};
export default RequestComponents;
