"use client";
import React, { useState } from "react";
import { useStateContext } from "./BookingContext";
import LoadingSpinner from "@/app/Components/LoadingSpinner";
import getEmailFromSessionStorage from "@/app/Components/CommonFunction";

const DetailsBar = () => {
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const {
    setIsLoading,
    setBookings,
    isCurrentBooking,
    status,
    bookingDetails,
    setShouldRegenerate,
    setCurrentBookings,
  } = useStateContext();
  const {
    bookingId,
    user_id,
    user_role,
    handler,
    room_capacity,
    request_capacity,
    description,
    comment,
  } = bookingDetails ?? {};
  // Remove request from table after approving/rejecting
  const getBookingData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/get_All_Bookings_Admin/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ typeCheck: "current" }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBookings(data);
        setCurrentBookings(data);
        setShouldRegenerate(true);
      }
    } catch (error) {
      console.error("Error fetching all bookings: ", error);
      throw error;
    }
  };

  const handleCancel = async () => {
    if (newComment.trim() === "") {
      setError("Required");
    } else {
      // Proceed with form submission
      const confirmed = window.confirm(
        "Are you sure you want to reject this booking?"
      );
      if (confirmed) {
        setIsLoading(true);
        try {
          const response = await fetch(
            "http://localhost:8000/booking_Cancel/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                bookingID: bookingId,
                reason: newComment,
                handler: getEmailFromSessionStorage(),
              }),
            }
          );
          if (response.ok) {
            setNewComment("");
            getBookingData();
            // getBookingDetails();
          }
        } catch (error) {
          console.error("Error approving/rejecting request:", error);
          throw error;
        }
        // setShouldRegenerate(true);
        setIsLoading(false);
      }
    }
  };
  const subHeadingStyle = "text-lg font-bold text-stone-800 mt-3";
  return (
    <div className="flex flex-1 flex-col">
      <div className="justify-start text-2xl font-bold text-stone-900">
        Booking Details
      </div>
      <div className="border-neutral-400 flex-1 flex-col justify-start inline-flex">
        <div className={subHeadingStyle}>From:</div>
        <div className="text-l mt-1">
          {user_id} ({user_role})
        </div>
        <div className={subHeadingStyle}>Handled By:</div>
        <div className="text-l mt-1">{handler}</div>

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
        {comment && (
          <>
            <div className={`${subHeadingStyle}`}>Comment:</div>
            <ul className="space-y-3 mt-1 text-l leading-tight italic text-justify font-medium text-stone-700">
              <li>{comment}</li>
            </ul>
          </>
        )}

        {isCurrentBooking && status === "Accepted" && (
          <>
            {/* <RectangularCheckbox
              label={"Comment"}
              checked={checked}
              onChange={() => {
                setChecked(!checked);
                setNewComment("");
              }}
            />
            {checked && ( */}
            <div className={`${subHeadingStyle}`}>
              <sup className="text-red-500">*</sup>Comment:
              {error && (
                <span className="text-red-400 ml-5 text-sm font-light italic">
                  {error}
                </span>
              )}
            </div>
            <textarea
              className="h-[100px] leading-tight text-[12px] resize-none flex-shrink-0 bg-black-50 rounded-lg p-4 mr-1 focus:bg-white-50 focus:placeholder-white-50"
              placeholder="Enter comment here..."
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
                if (error) {
                  setError("");
                }
              }}
            />
            <div className="flex mt-5 mb-5 justify-center">
              <button
                className="bg-red-500 w-[150px] h-[50px] hover:bg-red-800 text-white-50 rounded-md py-2 px-4 ml-3 transition duration-200 ease-in-out"
                onClick={handleCancel}
              >
                Reject
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default DetailsBar;
