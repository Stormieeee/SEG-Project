"use client";
import React, { useState, useEffect } from "react";
import Sortbar from "./Sortbar";
import SearchBar from "./SearchBar";
import RequestComponents from "./RequestComponents";
import getEmailFromSessionStorage from "../../Components/CommonFunction";

const BookingRequestPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [requests, setRequests] = useState<string[][]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
  const [filteredRequests, setFilteredRequests] = useState<string[][]>([]);

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
      <div className="h-10 flex mt-3 items-center justify-center relative">
        <Sortbar
          filteredRequests={filteredRequests}
          setFilteredRequests={setFilteredRequests}
          setSelectedRowIndex={setSelectedRowIndex}
        />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <RequestComponents
        searchTerm={searchTerm}
        requests={requests}
        setRequests={setRequests}
        filteredRequests={filteredRequests}
        setFilteredRequests={setFilteredRequests}
        selectedRowIndex={selectedRowIndex}
        setSelectedRowIndex={setSelectedRowIndex}
      />
    </div>
  );
};
export default BookingRequestPage;
