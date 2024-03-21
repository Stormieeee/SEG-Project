"use client";
import React, { useState, useEffect } from "react";
import Sortbar from "./Sortbar";
import RequestComponents from "./RequestComponents";
import { getEmailFromSessionStorage } from "@/app/auth/page";

const BookingRequestPage = () => {
  const [requests, setRequests] = useState<string[][]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);

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
      <RequestComponents
        requests={requests}
        setRequests={setRequests}
        selectedRowIndex={selectedRowIndex}
        setSelectedRowIndex={setSelectedRowIndex}
      />
    </div>
  );
};
export default BookingRequestPage;
