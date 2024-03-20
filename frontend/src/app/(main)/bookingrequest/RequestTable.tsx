import React, { useState } from "react";

interface RequestTableProps {
  data: string[][] | null;
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
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
const RequestTable = ({
  data,
  isSelected,
  setIsSelected,
  setRequestDetails,
}: RequestTableProps) => {
  const header = ["Booking Number", "Room", "Date", "Start Time", "End Time"];
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [prevClickedIndex, setPrevClickedIndex] = useState<number | null>(null);

  const getRequestDetails = async (bookingId: string, index: number) => {
    setSelectedRowIndex(index);
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
    if (!isSelected) {
      setIsSelected(!isSelected);
    } else {
      if (prevClickedIndex === index) {
        setIsSelected(!isSelected);
      }
    }
    setPrevClickedIndex(index);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-between bg-white-200 border border-black-100 rounded-md">
        {header.map((item, index) => (
          <div key={index} className="flex-1 py-3 text-center font-semibold">
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
              <div
                key={cellIndex}
                className={`flex-1 py-2 text-center ${
                  cellIndex === 0 ? "pl-2" : ""
                } ${cellIndex === header.length - 1 ? "pr-2" : ""}`}
              >
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
