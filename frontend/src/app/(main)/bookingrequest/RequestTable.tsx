import React, { useEffect, useState } from "react";

interface RequestTableProps {
  searchTerm: string;
  requests: string[][];
  setRequestDetails: React.Dispatch<
    React.SetStateAction<{
      bookingId: string;
      user_id: string;
      user_role: string;
      request_capacity: number;
      room_capacity: number;
      description: string;
    } | null>
  >;
  filteredRequests: string[][];
  setFilteredRequests: React.Dispatch<React.SetStateAction<string[][]>>;
  selectedRowIndex: number;
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number>>;
}
const RequestTable = ({
  searchTerm,
  requests,
  setRequestDetails,
  filteredRequests,
  setFilteredRequests,
  selectedRowIndex,
  setSelectedRowIndex,
}: RequestTableProps) => {
  const header = ["Booking ID", "Room", "Date", "Start Time", "End Time"];

  const getRequestDetails = async (bookingId: string, index: number) => {
    try {
      const response = await fetch(
        "http://localhost:8000/get_request_details_accepter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookingID: bookingId }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRequestDetails({ index, bookingId, ...data });
      }
    } catch (error) {
      console.error("Error fetching booking request details: ", error);
      throw error;
    }
  };

  useEffect(() => {
    if (selectedRowIndex >= 0 && requests) {
      getRequestDetails(
        filteredRequests[selectedRowIndex][0],
        selectedRowIndex
      );
    }
  }, [filteredRequests]);
  useEffect(() => {
    if (requests && searchTerm) {
      const filtered = requests.filter(
        (request) =>
          request[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
          request[1].toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRequests(filtered);
      if (filtered.length === 0) {
        setSelectedRowIndex(-1);
      } else {
        if (selectedRowIndex !== -1) {
          setSelectedRowIndex(0);
        }
      }
    } else {
      setFilteredRequests(requests);
    }
  }, [requests, searchTerm]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-between bg-white-200 border border-black-100 rounded-md">
        {header.map((item, index) => (
          <div key={index} className="flex-1 py-3 text-center font-semibold">
            {item}
          </div>
        ))}
      </div>
      {filteredRequests.length > 0 ? (
        filteredRequests.map((rowData: any[], rowIndex: number) => (
          <button
            key={rowIndex}
            className={`flex h-[50px] flex-shrink-0 justify-between mt-1 items-center border border-primary-400 rounded-md ${
              selectedRowIndex === rowIndex
                ? "bg-primary-300"
                : "bg-primary-50 hover:bg-primary-100 hover:border-primary-300 cursor-pointer transition duration-300 ease-in-out"
            }`}
            onClick={() => {
              getRequestDetails(rowData[0], rowIndex);
              if (selectedRowIndex === rowIndex) {
                setSelectedRowIndex(-1);
              } else {
                setSelectedRowIndex(rowIndex);
              }
            }}
          >
            {rowData.map((cellData, cellIndex) => (
              <div key={cellIndex} className="flex-1 py-2 text-center">
                {cellData}
              </div>
            ))}
          </button>
        ))
      ) : (
        <div className="flex justify-center items-center h-40">
          No requests found
        </div>
      )}
    </div>
  );
};
export default RequestTable;
