import React, { useEffect, useState } from "react";
import { useStateContext } from "./BookingContext";

const RequestTable = () => {
  const {
    filteredBookings,
    displayedBookings,
    setDisplayedBookings,
    selectedRowIndex,
    setSelectedRowIndex,
    rowsPerPage,
    currentPage,
    setCurrentPage,
    setBookingDetails,
    setStatus,
    bookingDetails,
    shouldRegenerate,
  } = useStateContext();
  const { bookingId } = bookingDetails ?? {};
  const header = [
    "Booking ID",
    "Room",
    "Date",
    "Start Time",
    "End Time",
    "Status",
  ];

  const getBookingDetails = async (bookingId: string) => {
    if (selectedRowIndex >= 0) {
      try {
        console.log(bookingId);
        // console.log(bookingId, status);
        const response = await fetch(
          "http://localhost:8000/get_Booking_Details_Admin/",
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
          setBookingDetails({ bookingId, ...data });
        }
      } catch (error) {
        console.error("Error fetching booking request details: ", error);
        throw error;
      }
    }
  };

  const refreshTable = () => {
    if (filteredBookings && filteredBookings.length >= 0) {
      const start = (currentPage - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      setDisplayedBookings(filteredBookings.slice(start, end));
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
    console.log("filteredBookings", filteredBookings);
    refreshTable();
  }, [filteredBookings]);

  // Reset selected row index when requests changed (e.g. after approving/rejecting)
  useEffect(() => {
    if (displayedBookings.length === 0) {
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
      console.log("displayedBookings", displayedBookings);
    }
  }, [displayedBookings]);
  // Get request details when selected row changes
  useEffect(() => {
    if (selectedRowIndex >= 0 && displayedBookings.length > 0) {
      setStatus(displayedBookings[selectedRowIndex][5]);
      getBookingDetails(displayedBookings[selectedRowIndex][0]);
    }
  }, [displayedBookings, selectedRowIndex]);
  const getStatusColor = (cellData: string) => {
    switch (cellData) {
      case "Pending":
        return "bg-yellow-50 text-orange-400";
      case "Accepted":
        return "bg-sky-400 text-white-100";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-red-500 text-white-100";
    }
  };
  const renderHeaderItem = (item: string) => {
    if (item === "Booking ID") {
      return (
        <>
          <span className="hidden lg:inline">Booking ID</span>
          <span className="lg:hidden">ID</span>
        </>
      );
    } else if (item === "Start Time" || item === "End Time") {
      return (
        <>
          <span className="hidden lg:inline">{item}</span>
          <span className="lg:hidden">{item.slice(0, 5)}</span>
        </>
      );
    } else {
      return item;
    }
  };

  // Function to render row item based on screen size and header content
  const renderRowItem = (cellData: string, headerItem: string) => {
    if (headerItem === "Start Time" || headerItem === "End Time") {
      return (
        <>
          <span className="hidden lg:inline">{cellData}</span>
          <span className="lg:hidden">{cellData.slice(0, 5)}</span>
        </>
      );
    } else if (headerItem === "Date") {
      return (
        <>
          <span className="hidden lg:inline">{cellData}</span>
          <span className="lg:hidden">{cellData.slice(5)}</span>
        </>
      );
    } else {
      return cellData;
    }
  };

  return (
    <div className="flex flex-col overflow-y-auto">
      <div className="flex justify-between bg-white-200 border border-black-100 rounded-md sticky top-0">
        {header.map((item, index) => (
          <div
            key={index}
            className={`flex-1 py-3 text-center font-semibold ${index === header.length - 1 ? `max-w-[140px] mx-5` : ""}`}
          >
            {renderHeaderItem(item)}
          </div>
        ))}
      </div>
      {displayedBookings.length > 0 ? (
        displayedBookings.map((rowData: string[], rowIndex: number) => (
          <button
            key={rowIndex}
            className={`flex h-[50px] flex-shrink-0 justify-between mt-1 items-center border border-primary-400 rounded-md ${
              selectedRowIndex === rowIndex
                ? "bg-primary-300"
                : "bg-primary-50 hover:bg-primary-100 hover:border-primary-300 cursor-pointer transition duration-300 ease-in-out"
            }`}
            onClick={() => {
              if (selectedRowIndex === rowIndex) {
                setSelectedRowIndex(-1);
              } else {
                setSelectedRowIndex(rowIndex);
              }
            }}
          >
            {rowData.map((cellData, cellIndex) => (
              <div
                key={cellIndex}
                className={`flex-1 py-[0.7rem] font-xl text-center ${cellIndex === header.length - 1 ? `rounded-xl max-w-[140px] mx-5 ${getStatusColor(cellData)}` : ""}`}
              >
                {renderRowItem(cellData, header[cellIndex])}
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
