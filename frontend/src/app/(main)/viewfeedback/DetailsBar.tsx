"use client";
import React from "react";
import editIcon from "../../../../public/Login-icon/edit_icon.svg";
import Image from "next/image";
import { useStateContext } from "./MyBookingContext";
import { useStateContext as mainStateContext } from "../StateContext";

const DetailsBar = () => {
  const {
    feedbackList,
    setFeedbackList,
    feedbackDetails,
    selectedRowIndex,
    setSelectedRowIndex,
    isCurrentFeedback,
    setFeedback,
    isLoading,
    setCurrentFeedbackList,
    setPastFeedbackList,
  } = useStateContext();
  const { title, roomID, request_capacity, room_capacity, description } =
    feedbackDetails ?? {};
  const { setIsLoading } = mainStateContext();

  // Remove request from table after approving/rejecting
  const handleRemoveItem = (indexToRemove: number) => {
    const feedbackID = feedbackList[indexToRemove][0];
    setCurrentFeedbackList((bookings) =>
      bookings.filter((booking) => booking[0] !== feedbackID)
    );
    // add feedback of feedbackID to pastFeedbackList
    setPastFeedbackList((bookings) => [
      ...bookings,
      feedbackList[indexToRemove],
    ]);
    setFeedbackList((bookings) =>
      bookings.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/read_Feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingID: feedbackList[selectedRowIndex][0],
        }),
      });

      if (response.ok) {
        if (selectedRowIndex >= 0 && feedbackDetails) {
          handleRemoveItem(selectedRowIndex);
          if (selectedRowIndex === feedbackList.length - 1) {
            setSelectedRowIndex(selectedRowIndex - 1);
          }
        }
      } else {
        console.error("Error in API response:", response.statusText);
      }
    } catch (error) {
      console.error("Error Approving This Feedback", error);
    } finally {
      setIsLoading(false);
    }
  };

  const subHeadingStyle = "text-lg font-bold text-stone-800 mt-3";

  return (
    <div className="flex flex-1 flex-col">
      <div className="justify-start text-2xl font-bold text-stone-900">
        Feedback
      </div>
      <div className="border-neutral-400 flex-1 flex-col justify-start inline-flex">
        <div className={`${subHeadingStyle}`}>Feedback Specific:</div>
        <ul className="pl-1 space-y-2 mt-2 text-base font-medium text-stone-700">
          <li>Room ID: {roomID}</li>
          <li>Room Capacity: {room_capacity}</li>
          <li>Request Capacity: {request_capacity}</li>
          <li>Purpose:</li>
          <ul className="list-disc pl-5 mt-1 w-[350px] text-m">
            <li className="leading-tight text-justify">{description} </li>
          </ul>
        </ul>
        {isCurrentFeedback && (
          <div className="flex justify-center mt-5">
            <button
              className="bg-primary-400 w-[150px] h-[50px] hover:bg-primary-600 text-white-50 rounded-md py-2 px-4 transition duration-200 ease-in-out"
              onClick={() => {
                handleSubmit();
              }}
            >
              Solved
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default DetailsBar;
