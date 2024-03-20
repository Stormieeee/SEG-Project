"use client";
import React, { useState, useEffect } from "react";
import RequestTable from "./RequestTable";
import SearchBar from "./SearchBar";
import DetailsBar from "./DetailsBar";
import { getEmailFromSessionStorage } from "@/app/auth/page";

const BookingRequestPage = () => {
  const [data, setData] = useState<string[][] | null>(null);
  const [requestDetails, setRequestDetails] = useState<{
    index: number;
    bookingId: string;
    requester: string;
    bookingSpecific: {
      room_capacity: number;
      booking_capacity: number;
      purpose: string[];
    };
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
        setData(data);
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
      <div className="w-[731px] h-9 ml-2 py-1.5">
        <SearchBar />
      </div>
      <div className="flex">
        <div className="flex ml-10 mr-5 mt-5 w-2/3 overflow-auto h-[550px]">
          <RequestTable
            data={data}
            setData={setData}
            setRequestDetails={setRequestDetails}
          />
        </div>
        <div className="flex pl-5 mt-5 mr-5 w-1/3 overflow-y border-l  border-black-100 h-[550px]">
          <DetailsBar data={data} setData={setData} {...requestDetails} />
        </div>
      </div>
    </div>
  );
};
export default BookingRequestPage;
