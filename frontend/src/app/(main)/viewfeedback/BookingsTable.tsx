import React, { useEffect } from "react";
import { useStateContext } from "./MyBookingContext";

const BookingsTable = () => {
  const {
    feedbackList,
    setFeedbackStatus,
    setFeedbackDetails,
    selectedRowIndex,
    setSelectedRowIndex,
  } = useStateContext();
  const header = [
    "Booking ID",
    "Title",
    "Description",
  ];

  useEffect(() => {
    if (selectedRowIndex >= 0 && feedbackList) {
      const rowData = feedbackList[selectedRowIndex];
      // const [bookingId, bookingStatus] = [rowData[0], rowData[5]];
    }
  }, [feedbackList]);

  const getFeedbackDetails = async (
    bookingId: string,
    index: number
  ) => {
    setSelectedRowIndex(index);
    try {
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
        const roomID = await getRoomID(bookingId);
        setFeedbackDetails({ index, roomID,  ...data });
      }
    } catch (error) {
      console.error("Error fetching booking request details: ", error);
      throw error;
    }
  };

  const getRoomID = async (
    bookingId: string
  ) =>{
    try{
      const response = await fetch("http://localhost:8000/get_room_from_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({bookingID: bookingId,

        }),
      })
      
      if(response.ok){
        const data = await response.json();
        return data
      }
    }catch(error){
      console.log("Room ID could not be found")
    }
  };

  return (
    <div className="flex flex-col overflow-y-auto">
      <div className="flex justify-between bg-white-100 border border-black-100 rounded-md sticky top-0">
        {header.map((item, index) => (
          <div
            key={index}
            className={`flex-1 py-3 text-center font-semibold ${index === header.length - 1 ? ` mx-5` : ""}`}
          >
            {item}
          </div>
        ))}
      </div>
      {feedbackList.length > 0 ? (
        feedbackList.map((rowData: any[], rowIndex: number) => (
          <button
            key={rowIndex}
            className={`flex h-[50px] flex-shrink-0 mt-1 justify-between items-center border border-primary-400 rounded-md ${
              selectedRowIndex === rowIndex
                ? "bg-primary-300"
                : "bg-primary-50 hover:bg-primary-100 hover:border-primary-300 cursor-pointer transition duration-300 ease-in-out"
            }`}
            onClick={() => {
              getRoomID(rowData[0])
              getFeedbackDetails(rowData[0] , rowIndex);
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
                className={`flex-1 py-[0.7rem] font-xl text-center ${cellIndex === header.length - 1 ? `rounded-xl  mx-5` : ""}`}
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