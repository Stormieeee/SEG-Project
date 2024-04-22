import React, { useEffect } from "react";
import { useStateContext } from "./MyBookingContext";

const BookingsTable = () => {
  const {
    feedbacks,
    setFeedbackStatus,
    setFeedbackDetails,
    selectedRowIndex,
    setSelectedRowIndex,
    setSelectedBookingId,
  } = useStateContext();
  const header = [
    "Booking ID",
    "Room",
    "Date",
    "Start Time",
    "End Time",
    "Status",
  ];


  
  useEffect(() => {
    if (selectedRowIndex >= 0 && feedbacks) {
      const rowData = feedbacks[selectedRowIndex];
      const [bookingId, bookingStatus] = [rowData[0], rowData[5]];
    }
  }, [feedbacks]);

  return (
    <div className="flex flex-col overflow-y-auto">
      <div className="flex justify-between bg-white-100 border border-black-100 rounded-md sticky top-0">
        {header.map((item, index) => (
          <div
            key={index}
            className={`flex-1 py-3 text-center font-semibold ${index === header.length - 1 ? `max-w-[140px] mx-5` : ""}`}
          >
            {item}
          </div>
        ))}
      </div>
      {feedbacks.length > 0 ? (
        feedbacks.map((rowData: any[], rowIndex: number) => (
          <button
            key={rowIndex}
            className={`flex h-[50px] flex-shrink-0 mt-1 justify-between items-center border border-primary-400 rounded-md ${
              selectedRowIndex === rowIndex
                ? "bg-primary-300"
                : "bg-primary-50 hover:bg-primary-100 hover:border-primary-300 cursor-pointer transition duration-300 ease-in-out"
            }`}
            onClick={() => {
              getBookingDetails(rowData[0], rowData[5], rowIndex);
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
                {cellData}
              </div>
            ))}
          </button>
        ))
      ) : (
        <div className="flex justify-center items-center h-40">
          No booking found
        </div>
      )}
    </div>
  );
};
export default BookingsTable;
