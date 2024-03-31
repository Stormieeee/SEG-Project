"use client";
import React, { useState, useEffect } from "react";
import Sortbar from "./Sortbar";
import RequestComponents from "./RequestComponents";
import getEmailFromSessionStorage from "../../Components/CommonFunction";

const BookingRequestPage = () => {
  const [requests, setRequests] = useState<string[][]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);

  const getRequestData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/get_booking_requests_accepter/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ UserID: getEmailFromSessionStorage() }),
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
      <div className="ml-10 h-10 flex items-center">
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
