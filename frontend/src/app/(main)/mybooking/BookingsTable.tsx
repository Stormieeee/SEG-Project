import React, { useEffect } from "react";

interface BookingsTableProps {
  bookings: string[][];
  setBookingStatus: React.Dispatch<React.SetStateAction<string>>;
  setBookingDetails: React.Dispatch<
    React.SetStateAction<{
      index: number;
      user_id: string;
      request_capacity: number;
      room_capacity: number;
      description: string;
      comment: string;
    } | null>
  >;
  selectedRowIndex: number;
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number>>;
}
const BookingsTable = ({
  bookings,
  setBookingStatus,
  setBookingDetails,
  selectedRowIndex,
  setSelectedRowIndex,
}: BookingsTableProps) => {
  const header = [
    "Booking ID",
    "Room",
    "Date",
    "Start Time",
    "End Time",
    "Status",
  ];

  const getBookingDetails = async (
    bookingId: string,
    bookingStatus: string,
    index: number
  ) => {
    setBookingStatus(bookingStatus);
    setSelectedRowIndex(index);
    try {
      const response = await fetch(
        "http://localhost:8000/get_booking_details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ booking_id: bookingId }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBookingDetails({ index, ...data });
      }
    } catch (error) {
      console.error("Error fetching booking request details: ", error);
      throw error;
    }
  };
  const getStatusColor = (cellData: string) => {
    switch (cellData) {
      case "Pending":
        return "bg-yellow-50 text-orange-400";
      case "Approved":
        return "bg-sky-400 text-white-100";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-red-500 text-white-100";
    }
  };
  useEffect(() => {
    if (selectedRowIndex >= 0 && bookings) {
      const rowData = bookings[selectedRowIndex];
      const [bookingId, bookingStatus] = [rowData[0], rowData[5]];
      getBookingDetails(bookingId, bookingStatus, selectedRowIndex);
    }
  }, [bookings]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-between items-center bg-white-200 border border-black-100 rounded-md">
        {header.map((item, index) => (
          <div key={index} className="flex-1 py-3 text-center font-semibold">
            {item}
          </div>
        ))}
      </div>
      {bookings.length > 0 ? (
        bookings.map((rowData: any[], rowIndex: number) => (
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
                className={`mx-8 flex-1 py-[0.7rem] font-xl text-center ${cellIndex === header.length - 1 ? `rounded-xl ${getStatusColor(cellData)}` : ""}`}
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
