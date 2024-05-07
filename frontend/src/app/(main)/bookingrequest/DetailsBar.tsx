"use client";
import React, { useState } from "react";
import { useStateContext } from "./RequestContext";
import RectangularCheckbox from "./RectangularCheckbox";
import LoadingSpinner from "@/app/Components/LoadingSpinner";
import getEmailFromSessionStorage from "@/app/Components/CommonFunction";
import { useStateContext as mainStateContext } from "../StateContext";

const DetailsBar = () => {
  const [comment, setComment] = useState("");
  const [checked, setChecked] = useState(false);
  const {
    setRequests,
    selectedRowIndex,
    setSelectedRowIndex,
    displayedRequests,
    setFilteredRequests,
    requestDetails,
  } = useStateContext();
  const {
    bookingId,
    user_id,
    user_role,
    room_capacity,
    request_capacity,
    description,
  } = requestDetails ?? {};
  // Popup message after approving/rejecting booking
  const { setIsVisible, setMessage, setIsSuccess, setIsLoading } =
    mainStateContext();

  // Remove request from table after approving/rejecting
  const handleRemoveItem = (bookingId: string) => {
    setRequests((prev) => prev.filter((request) => request[0] !== bookingId));
    setFilteredRequests((prev) =>
      prev.filter((request) => request[0] !== bookingId)
    );
  };

  const handleSubmit = async (action: string) => {
    const confirmed = window.confirm(
      action === "approve"
        ? "Are you sure you want to approve booking ?"
        : "Are you sure you want to reject this booking?"
    );
    if (confirmed) {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8000/handle_booking/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: action,
            bookingID: bookingId,
            comment: comment,
            handler: getEmailFromSessionStorage(),
          }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data[0] === "Collision") {
            setMessage(
              "Collision detected! Please decline this booking request."
            );
            setIsSuccess(false);
          } else {
            handleRemoveItem(bookingId ? bookingId : "");
            if (selectedRowIndex === displayedRequests.length - 1) {
              setSelectedRowIndex(selectedRowIndex - 1);
            }
            setMessage("Booking request handled successfully");
            setIsSuccess(true);
          }
        }
      } catch (error) {
        setMessage("Error approving/rejecting request");
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
        setChecked(false);
        setIsVisible(true);
      }
    }
  };
  const subHeadingStyle = "text-lg font-bold text-stone-800 mt-3";
  return (
    <div className="flex flex-1 flex-col">
      <div className="justify-start text-2xl font-bold text-stone-900">
        Request Details
      </div>
      <div className="border-neutral-400 flex-1 flex-col justify-start inline-flex">
        <div className={subHeadingStyle}>From:</div>
        <div className="text-l mt-1">
          {user_id} ({user_role})
        </div>

        <div className={subHeadingStyle}>Booking Specific:</div>
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
        <RectangularCheckbox
          label={"Comment"}
          checked={checked}
          onChange={() => {
            setChecked(!checked);
            setComment("");
          }}
        />
        {checked && (
          <textarea
            className="h-[100px] leading-tight text-[12px] resize-none flex-shrink-0 bg-black-50 rounded-lg p-4 mr-1 focus:bg-white-50 focus:placeholder-white-50"
            placeholder="Enter comment here..."
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        )}
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
