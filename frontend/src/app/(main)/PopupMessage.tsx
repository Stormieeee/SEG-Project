"use client";
import React, { useEffect } from "react";
import { useStateContext } from "./StateContext";

const PopupMessage = () => {
  const { message, isVisible, setIsVisible, isSuccess } = useStateContext();
  useEffect(() => {
    console.log("isVisible", isVisible);
    // Hide the message after 1 seconds
    if (isVisible) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 1000);

      return () => clearTimeout(timeout); // Clean up the timeout on unmount
    }
  }, [isVisible]);

  return (
    <div>
      <div
        className={`absolute top-0 left-1/2 transform -translate-x-1/2 mt-10 flex justify-center transition-all duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}`}
      >
        <p
          className={`${isSuccess ? "bg-green-100" : "bg-red-100"} p-5 rounded-md`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default PopupMessage;
