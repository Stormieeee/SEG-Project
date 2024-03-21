"use client";
import React, { useState } from "react";
interface DetailsBarProps {
  requests: string[][];
  setRequests: React.Dispatch<React.SetStateAction<string[][]>>;
  selectedRowIndex: number;
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number>>;
  bookingId?: string;
  user_id?: string;
  user_role?: string;
  request_capacity?: number;
  room_capacity?: number;
  description?: string;
}

const DetailsBar = ({
  requests,
  setRequests,
  selectedRowIndex,
  setSelectedRowIndex,
  bookingId,
  user_id,
  user_role,
  room_capacity,
  request_capacity,
  description,
}: DetailsBarProps) => {
  const [comment, setComment] = useState("");

  // Remove request from table after approving/rejecting
  const handleRemoveItem = (indexToRemove: number) => {
    const newRequests = requests.filter((_, index) => index !== indexToRemove);
    setRequests(newRequests);
  };

  const handleSubmit = async (action: string) => {
    const confirmed = window.confirm(
      action === "approve"
        ? "Are you sure you want to approve this booking?"
        : "Are you sure you want to reject this booking?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          "https://your-api-endpoint/approve_reject_request",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: action,
              booking_id: bookingId,
              comment: comment,
            }),
          }
        );

        if (response.ok) {
          if (selectedRowIndex >= 0 && requests) {
            handleRemoveItem(selectedRowIndex);
            if (selectedRowIndex === requests.length - 1) {
              setSelectedRowIndex(selectedRowIndex - 1);
            }
          }
        }
      } catch (error) {
        console.error("Error approving/rejecting request:", error);
        throw error;
      }
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-neutral-400 justify-start text-2xl font-bold">
        Request Details
      </div>
      <div className="border-neutral-400 flex-1 flex-col justify-start inline-flex">
        <div className="text-xl font-bold">From:</div>
        <div className="text-l mt-1">
          {user_id} ({user_role})
        </div>

        <div className="text-xl font-bold mt-5">Booking Specific:</div>
        <ul className="list-decimal pl-5">
          <li className="text-l mt-1">Room Capacity: {room_capacity}</li>
          <li className="text-l mt-3">Request Capacity: {request_capacity}</li>
          <li className="text-l mt-3">Purpose:</li>
          <ul className="list-disc pl-5 mt-1 w-[350px]">
            {description && (
              <li className="text-m py-1 leading-tight text-justify">
                {description}
              </li>
            )}
          </ul>
        </ul>

        <div className="text-xl font-bold mt-5">Comment:</div>
        <textarea
          className="h-[100px] leading-tight text-[12px] flex-shrink-0 bg-black-50 rounded-lg p-4 focus:bg-white-50 focus:placeholder-white-50"
          placeholder="Enter comment here..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />

        <div className="flex justify-between mt-5 mb-5">
          <button
            className="bg-green-500 w-[150px] h-[50px] hover:bg-green-700 text-white-50 rounded-md py-2 px-4 transition duration-200 ease-in-out"
            onClick={() => handleSubmit("approve")}
          >
            Approve
          </button>
          <button
            className="bg-red-500 w-[150px] h-[50px] hover:bg-red-800 text-white-50 rounded-md py-2 px-4 ml-3 transition duration-200 ease-in-out"
            onClick={() => handleSubmit("reject")}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};
export default DetailsBar;
