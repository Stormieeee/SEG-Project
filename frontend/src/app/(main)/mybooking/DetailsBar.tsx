"use client";
import React from "react";
import editIcon from "../../../../public/Login-icon/edit_icon.svg";
import Image from "next/image";
import { useStateContext } from "./MyBookingContext";
import { useStateContext as mainStateContext } from "../StateContext";
import getEmailFromSessionStorage from "@/app/Components/CommonFunction";

const DetailsBar = () => {
  const {
    bookings,
    setBookings,
    bookingStatus,
    bookingDetails,
    selectedRowIndex,
    setSelectedRowIndex,
    isCurrentBooking,
    setTitle,
    setFeedback,
    isLoading,
    setIsLoading,
    setShowForm,
    setCurrentBookings,
  } = useStateContext();
  const {
    request_capacity,
    room_capacity,
    description,
    comment,
    feedback_title,
    feedback_text,
  } = bookingDetails ?? {};

  // Popup message after canceling booking
  const { setIsVisible, setMessage, setIsSuccess } = mainStateContext();

  // Remove request from table after approving/rejecting
  const handleRemoveItem = (indexToRemove: number) => {
    const bookingID = bookings[indexToRemove][0];
    setCurrentBookings((bookings) =>
      bookings.filter((booking) => booking[0] !== bookingID)
    );
    setBookings((bookings) =>
      bookings.filter((_, index) => index !== indexToRemove)
    );
  };
  const handleSubmit = async () => {
    const confirmed = window.confirm(
      bookingStatus === "Approved"
        ? "Are you sure you want to cancel this approved booking?"
        : "Are you sure you want to cancel this booking request?"
    );
    if (confirmed) {
      setIsLoading(true);
      console.log("selectedRowIndex", selectedRowIndex);
      console.log("booking id", bookings[selectedRowIndex][0]);
      try {
        const response = await fetch("http://localhost:8000/booking_Cancel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingID: bookings[selectedRowIndex][0],
            reason: "User canceled",
            handler: getEmailFromSessionStorage(),
          }),
        });

        if (response.ok) {
          if (selectedRowIndex >= 0 && bookings) {
            handleRemoveItem(selectedRowIndex);
            if (selectedRowIndex === bookings.length - 1) {
              setSelectedRowIndex(selectedRowIndex - 1);
            }
          }
          setMessage("Booking canceled successfully");
          setIsSuccess(true);
        }
      } catch (error) {
        console.error("Error cancel booking/booking request:", error);
        setMessage("Error canceling booking/booking request");
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
        setIsVisible(true);
      }
    }
  };
  const handleEdit = () => {
    setTitle(feedback_title ? feedback_title : "");
    setFeedback(feedback_text ? feedback_text : "");
    setShowForm((prev) => !prev);
  };

  const subHeadingStyle = "text-lg font-bold text-stone-800 mt-3";
  const feedbackStyle = `bg-transparent leading-tight w-full border border-black-100 rounded-md resize-none px-1 focus-none`;
  return (
    <div className="flex flex-1 flex-col">
      <div className="justify-start text-2xl font-bold text-stone-900">
        Booking Details
      </div>
      <div className="border-neutral-400 flex-1 flex-col justify-start inline-flex">
        <div className={`${subHeadingStyle}`}>Booking Specific:</div>
        <ul className="pl-1 space-y-2 mt-2 text-base font-medium text-stone-700">
          <li>Room Capacity: {room_capacity}</li>
          <li>Request Capacity: {request_capacity}</li>
          <li>Purpose:</li>
          <ul className="list-disc pl-5 mt-1 w-[350px] text-m">
            <li className="leading-tight text-justify">{description} </li>
          </ul>
        </ul>
        {bookingStatus !== "Pending" && comment && (
          <>
            <div className={`${subHeadingStyle}`}>Comment:</div>
            <ul className="space-y-3 mt-1 text-l leading-tight italic text-justify font-medium text-stone-700">
              <li>{comment ? comment : "None"}</li>
            </ul>
          </>
        )}
        {bookingStatus === "Completed" && feedback_text && (
          <>
            <div className={`${subHeadingStyle} flex gap-5 items-center`}>
              Feedback:
              <span onClick={handleEdit}>
                <Image
                  src={editIcon}
                  alt="edit"
                  className="w-4 h-4 cursor-pointer"
                />
              </span>
            </div>
            <div className="flex w-full mb-2">
              <input
                type="text"
                value={feedback_title}
                readOnly
                disabled
                className={feedbackStyle}
              />
            </div>
            <div className="flex w-full">
              <textarea
                value={feedback_text}
                readOnly
                disabled
                className={feedbackStyle}
              />
            </div>
          </>
        )}
        {isCurrentBooking
          ? (bookingStatus === "Approved" || bookingStatus === "Pending") && (
              <div className="flex justify-center mt-5">
                <button
                  className="bg-red-500 w-[150px] h-[50px] hover:bg-red-700 text-white-50 rounded-md py-2 px-4 transition duration-200 ease-in-out"
                  onClick={handleSubmit}
                >
                  Cancel
                </button>
              </div>
            )
          : bookingStatus === "Completed" &&
            !feedback_text && (
              <div className="flex justify-center mt-5">
                <button
                  className="bg-primary-400 w-[150px] h-[50px] hover:bg-primary-600 text-white-50 rounded-md py-2 px-4 transition duration-200 ease-in-out"
                  onClick={() => {
                    setTitle("");
                    setFeedback("");
                    setShowForm(true);
                  }}
                >
                  Add Feedback
                </button>
              </div>
            )}
      </div>
    </div>
  );
};
export default DetailsBar;
