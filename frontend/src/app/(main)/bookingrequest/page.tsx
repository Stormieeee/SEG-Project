"use client";
import React, { useState, useEffect } from "react";
import RequestTable from "./RequestTable";
import Sortbar from "./Sortbar";
import DetailsBar from "./DetailsBar";
import { getEmailFromSessionStorage } from "@/app/auth/page";

const BookingRequestPage = () => {
  const [requests, setRequests] = useState<string[][]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
  const isSelected = selectedRowIndex >= 0;
  const [requestDetails, setRequestDetails] = useState<{
    bookingId: string;
    user_id: string;
    user_role: string;
    request_capacity: number;
    room_capacity: number;
    description: string;
  } | null>(null);

  const getRequestData = async () => {
    try {
      const response = await fetch(
        "https://your-api-endpoint/get_booking_requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: getEmailFromSessionStorage() }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error("Error fetching booking requests: ", error);
      throw error;
    }
  };

  useEffect(() => {
    getRequestData();
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <div className="ml-10">
        <Sortbar
          requests={requests}
          setRequests={setRequests}
          setSelectedRowIndex={setSelectedRowIndex}
        />
      </div>
      <div className="flex">
        <div
          className={`flex ml-10 mr-5 mt-5 overflow-y h-[550px] transition-width duration-500 ${isSelected ? "w-2/3" : "w-full"}`}
        >
          <RequestTable
            requests={requests}
            setRequestDetails={setRequestDetails}
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
    </div>
  );
};
export default BookingRequestPage;
