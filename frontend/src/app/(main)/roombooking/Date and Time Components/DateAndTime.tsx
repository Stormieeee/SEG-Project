"use client";
import React, { useState } from "react";
import {
  FORM_CONTAINER,
  FORM_INPUT,
  FORM_LABEL,
  WRAPPER,
} from "../ComponentFormat";
import datetimeLogo from "../../../../../public/Components-icon/Datetime Logo.svg";
import Image from "next/image";

const DateTime = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("12:00 PM");
  const [endTime, setEndTime] = useState("12:00 PM");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleStartTimeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEndTime(event.target.value);
  };

  const timeOptions = ["12:00 PM", "1:00 PM", "2:00 PM"];

  return (
    <div className={FORM_CONTAINER}>
      <div className="flex-col flex-grow h-full justify-center">
        <div className="flex items-center flex-row grow">
          <span className="text-zinc-800 font-medium text-xl px-2 items-center ">
            1
          </span>
          <span className="text-zinc-600 font-medium text-xl items-center flex pr-2">
            Date and Time
          </span>
          <Image
            src={datetimeLogo}
            alt="Date Time Logo"
            className="flex w-6 h-6"
          />

          <button className=" bg-black-500 text-zinc-200 hover:bg-black-900 font-normal text-sm ml-auto my-2 items-center justify-center flex p-2 rounded-md "
          onClick={checkAvailability}>
            Check Availability
          </button>
        </div>
        <div className="flex h-full py-5">
          <div className={WRAPPER}>
            <label className={FORM_LABEL}>Date</label>
            <input
              className={FORM_INPUT}
              type="date"
              value={date}
              onChange={handleDateChange}
            />
          </div>

          <div className={WRAPPER}>
            <label className={FORM_LABEL}>Start Time</label>
            <select
              className={FORM_INPUT}
              value={startTime}
              onChange={handleStartTimeChange}
            >
              {timeOptions.map((timeOption, index) => (
                <option key={index} value={timeOption}>
                  {timeOption}
                </option>
              ))}
            </select>
          </div>

          <div className={WRAPPER}>
            <label className={FORM_LABEL}>End Time</label>
            <select
              className={FORM_INPUT}
              value={endTime}
              onChange={handleEndTimeChange}
            >
              {timeOptions.map((timeOption, index) => (
                <option key={index} value={timeOption}>
                  {timeOption}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const checkAvailability = async () => {
  try{
    
  }catch (err){
    console.log("Current status could not be verified")
  }
};
export default DateTime;
