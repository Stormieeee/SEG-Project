"use client";
import React, { useState, useEffect } from "react";

interface RequestTableProps {
  data: string[][] | null;
  setData: React.Dispatch<React.SetStateAction<string[][] | null>>;
  setRequestDetails: React.Dispatch<
    React.SetStateAction<{
      index: number;
      bookingId: string;
      requester: string;
      bookingSpecific: {
        room_capacity: number;
        booking_capacity: number;
        purpose: string[];
      };
    } | null>
  >;
}
const RequestTable = ({ data, setRequestDetails }: RequestTableProps) => {
  const header = ["Booking Number", "Room", "Date", "Start Time", "End Time"];
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const getRequestDetails = async (bookingId: string, index: number) => {
    try {
      const response = await fetch(
        "https://your-api-endpoint/get_request_details",
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
        setRequestDetails({ index, ...data });
        setSelectedRowIndex(index);
      }
    } catch (error) {
      console.error("Error fetching booking request details: ", error);
      throw error;
    }
  };

  useEffect(() => {
    if (data) {
      getRequestDetails(data[0][0], 0);
      setSelectedRowIndex(0);
    }
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-between bg-white-200 border border-black-100 rounded-md">
        {header.map((item, index) => (
          <div key={index} className="w-1/5 py-3 text-center font-semibold">
            {item}
          </div>
        ))}
      </div>
      {data ? (
        data.map((rowData: any[], rowIndex: number) => (
          <button
            key={rowIndex}
            className={`flex h-[50px] flex-shrink-0 justify-between items-center border border-primary-400 rounded-md ${
              selectedRowIndex === rowIndex
                ? "bg-primary-300"
                : "bg-primary-50 hover:bg-primary-100 hover:border-primary-300 cursor-pointer transition duration-300 ease-in-out"
            }`}
            onClick={() => getRequestDetails(rowData[0], rowIndex)}
          >
            {rowData.map((cellData, cellIndex) => (
              <div key={cellIndex} className="w-1/6 py-2 text-center">
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
