import React, { useEffect, useState } from "react";
import { useStateContext } from "./RequestContext";

interface RequestTableProps {
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
}
const RequestTable = ({ setRequestDetails }: RequestTableProps) => {
  const {
    filteredRequests,
    displayedRequests,
    setDisplayedRequests,
    selectedRowIndex,
    setSelectedRowIndex,
    rowsPerPage,
    currentPage,
    setCurrentPage,
  } = useStateContext();
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

  const refreshTable = () => {
    if (filteredRequests && filteredRequests.length >= 0) {
      const start = (currentPage - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      setDisplayedRequests(filteredRequests.slice(start, end));
    }
  };

  // Refresh table when page or rows per page changes
  useEffect(() => {
    if (selectedRowIndex >= 0) {
      setSelectedRowIndex(0);
    }
    refreshTable();
  }, [currentPage, rowsPerPage]);

  // Refresh table when filtered requests change
  useEffect(() => {
    console.log("filteredRequests", filteredRequests);
    refreshTable();
  }, [filteredRequests]);

  // Reset selected row index when requests changed (e.g. after approving/rejecting)
  useEffect(() => {
    if (displayedRequests.length === 0) {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        if (selectedRowIndex >= 0) {
          setSelectedRowIndex(rowsPerPage - 1);
        }
      } else {
        setSelectedRowIndex(-1);
      }
    } else {
      console.log("selectedRowIndex", selectedRowIndex);
      console.log("displayedRequests", displayedRequests);
    }
  }, [displayedRequests]);
  // Get request details when selected row changes
  useEffect(() => {
    if (selectedRowIndex >= 0 && displayedRequests.length > 0) {
      console.log(displayedRequests[selectedRowIndex][0], selectedRowIndex);
      getRequestDetails(
        displayedRequests[selectedRowIndex][0],
        selectedRowIndex
      );
    }
  }, [displayedRequests, selectedRowIndex]);

  return (
    <div className="flex flex-col overflow-y-auto">
      <div className="flex justify-between bg-white-200 border border-black-100 rounded-md sticky top-0">
        {header.map((item, index) => (
          <div key={index} className="flex-1 py-3 text-center font-semibold">
            {item}
          </div>
        ))}
      </div>
      {displayedRequests.length > 0 ? (
        displayedRequests.map((rowData: string[], rowIndex: number) => (
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
