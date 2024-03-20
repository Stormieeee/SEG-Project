"use client";
import React, { useEffect, useState } from "react";
interface DetailsBarProps {
  data: string[][] | null;
  setData: React.Dispatch<React.SetStateAction<string[][] | null>>;
  index?: number; // Make index optional
  bookingId?: string; // Make bookingId optional
  requester?: string; // Make requester optional
  bookingSpecific?: {
    room_capacity?: number; // Make room_capacity optional
    booking_capacity?: number; // Make booking_capacity optional
    purpose?: string[]; // Make purpose optional
  };
}

const DetailsBar = ({
  data,
  setData,
  index,
  bookingId,
  requester,
  bookingSpecific: { room_capacity, booking_capacity, purpose } = {},
}: DetailsBarProps) => {
  const [comment, setComment] = useState("");

  // Remove request from table after approving/rejecting
  const handleRemoveItem = (indexToRemove: number) => {
    const newData = data?.filter((_, index) => index !== indexToRemove);
    setData(newData ?? null); // Use nullish coalescing operator
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
          {
            index && handleRemoveItem(index);
          }
        }
      } catch (error) {
        console.error("Error approving/rejecting request:", error);
        throw error;
      }
    }
  };
  useEffect(() => {
    console.log("data", data);
  }, []);
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-neutral-400 justify-start text-2xl font-bold">
        Request Details
      </div>
      {data ? (
        <div className="border-neutral-400 flex-1 flex-col justify-start inline-flex">
          <div className="text-xl font-bold">From:</div>
          <div className="text-l mt-1">{requester}</div>

          <div className="text-xl font-bold mt-5">Booking Specific:</div>
          <div className="text-l mt-1">1. Room Capacity: {room_capacity}</div>
          <div className="text-l mt-3">
            2. Booking Capacity: {booking_capacity}
          </div>
          <div className="text-l mt-3">3. Purpose:</div>
          <ul className="list-disc pl-5 mt-1 w-[350px]">
            {purpose &&
              purpose.map((purpose, index) => (
                <li key={index} className="text-m ml-5 py-1">
                  <div className="leading-tight text-justify">{purpose}</div>
                </li>
              ))}
          </ul>

          <div className="text-xl font-bold mt-5">Comment:</div>
          <textarea
            className="w-full h-[100px] leading-tight text-[12px] flex-shrink-0 bg-black-50 rounded-lg p-4 focus:bg-white-50 focus:placeholder-white-50"
            placeholder="Enter comment here..."
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />

          <div className="flex justify-between mt-5">
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
      ) : (
        <div className="flex justify-center items-center h-40">
          No request details found
        </div>
      )}
    </div>
  );
};
export default DetailsBar;
