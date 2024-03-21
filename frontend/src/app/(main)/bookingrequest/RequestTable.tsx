import React, { useEffect } from "react";

interface RequestTableProps {
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
  selectedRowIndex: number;
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number>>;
}
const RequestTable = ({
  requests,
  setRequestDetails,
  selectedRowIndex,
  setSelectedRowIndex,
}: RequestTableProps) => {
  const header = ["Booking ID", "Room", "Date", "Start Time", "End Time"];

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
      }
    } catch (error) {
      console.error("Error fetching booking request details: ", error);
      throw error;
    }

    if (selectedRowIndex === index) {
      setSelectedRowIndex(-1);
    } else {
      setSelectedRowIndex(index);
    }
  };

  useEffect(() => {
    if (selectedRowIndex >= 0 && requests) {
      getRequestDetails(requests[selectedRowIndex][0], selectedRowIndex);
    }
  }, [requests]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-between bg-white-200 border border-black-100 rounded-md">
        {header.map((item, index) => (
          <div key={index} className="flex-1 py-3 text-center font-semibold">
            {item}
          </div>
        ))}
      </div>
      {requests ? (
        requests.map((rowData: any[], rowIndex: number) => (
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
