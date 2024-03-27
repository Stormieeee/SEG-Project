"use client";
import React, { useEffect, useState } from "react";
import {
  FORM_CONTAINER,
  FormHeader,
  FORM_INPUT,
  FORM_LABEL,
  WRAPPER,
} from "../ComponentFormat";

import datetimeLogo from "../../../../../public/Components-icon/Datetime Logo.svg";
import { User } from "../../../types/types";

interface Option {
  value: number;
  label: string;
}

const DateTime = ({
  fetchData,
  onSelectStartTime,
  onSelectEndTime,
  onSetDate,
}: any) => {
  const [date, setDate] = useState("");
  const [startOptions, setStartOptions] = useState<Option[]>([]);
  const [endOptions, setEndOptions] = useState<Option[]>([]);
  const [startValue, setStartValue] = useState<number>(9); // Initialize with 9am
  const [endValue, setEndValue] = useState<number>(23);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const currentTime = new Date().getHours();
    setStartValue(currentTime);

    //   const generateOptions = () => {
    //     const availableOptions = [];

    //     // Generate options starting from the current local time
    //     for (let i = currentTime; i <= 23; i++) {
    //       availableOptions.push({ value: i, label: `${i}:00` });
    //     }

    //     setStartOptions(availableOptions);

    //     // Adjust the end time options based on the new start time
    //     const initialEndOptions = availableOptions.filter(
    //       (option) => option.value > currentTime
    //     );
    //     setEndOptions(availableOptions.slice(1));

    //     // Check if current time is outside the allowed range
    //     if (currentTime < 9 || currentTime > 23) {
    //       setDisabled(true);
    //     }
    //   };

    //   generateOptions();

    //   const interval = setInterval(generateOptions, 60000);

    return () => clearInterval(interval);
  }, []);

  //convert time from HH to HH:MM form in string
  const formatHour = (value: number): string => {
    // Pad single-digit hours with leading zero and return as HH:00
    return value.toString().padStart(2, "0") + ":00";
  };
  //Change Date
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value; // Assuming the input type is "date" and value is in "YYYY-MM-DD" format

    // Set the selected date directly if it's not today's date
    if (selectedDate !== new Date().toISOString().slice(0, 10)) {
      setStartValue(9);
      setEndValue(23);

      // Generate options starting from 9am to 11pm
      const availableOptions = [];
      for (let i = 9; i <= 23; i++) {
        availableOptions.push({ value: i, label: `${i}:00` });
      }
      setStartOptions(availableOptions);
      setEndOptions(availableOptions.slice(1));
    } else {
      const currentTime = new Date().getHours();

      // Generate options starting from the current local time
      const availableOptions = [];
      for (let i = currentTime; i <= 23; i++) {
        availableOptions.push({ value: i, label: `${i}:00` });
      }
      setStartOptions(availableOptions);
      setEndOptions(availableOptions.slice(1));

      // Set the start and end values to the current local time
      setStartValue(currentTime);
      setEndValue(currentTime);
    }

    setDate(selectedDate);
    onSetDate(selectedDate);
  };

  //Update Start time value
  const handleStartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value, 10);
    onSelectStartTime(newValue);
    setStartValue(newValue); // Added here *

    if (endValue < newValue) {
      setEndValue(newValue);
    }

    // Update end time options based on the new start time
    const newEndOptions = startOptions.filter(
      (option) => option.value > newValue
    );
    setEndOptions(newEndOptions);
  };
  //Update End time Value
  const handleEndChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value, 10);
    onSelectEndTime(newValue);
    setEndValue(newValue); // Added here *
    onSelectEndTime(newValue);
    setEndValue(newValue); // Added here *
  };

  return (
    <div className={FORM_CONTAINER}>
      <div className="flex-col flex-grow h-full justify-center">
        <div className="flex items-center flex-row grow">
          <FormHeader
            id="1"
            title="Date and Time"
            imgPath={datetimeLogo}
            imgAlt="Date Time Logo"
          />
          <form
            onSubmit={(event) => {
              event.preventDefault(); // Prevent default form submission
              fetchData(date, startValue, endValue); // Call fetchData when form is submitted
            }}
            className="ml-auto"
          >
            <button
              className="bg-black-500 text-zinc-200 hover:bg-black-900 font-normal text-sm  my-2 items-center justify-center flex p-2 rounded-md"
              type="submit"
            >
              Check Availability
            </button>
          </form>
        </div>

        {/* form */}
        <div className="flex h-full py-5">
          {/* date */}
          <div className={WRAPPER}>
            <label className={FORM_LABEL}>Date</label>
            <input
              className={FORM_INPUT}
              type="date"
              value={date}
              onChange={handleDateChange}
            />
          </div>

          {/* start time */}
          <div className={WRAPPER}>
            <label className={FORM_LABEL}>Start Time</label>
            <select
              className={FORM_INPUT}
              value={startValue}
              onChange={handleStartChange}
              disabled={disabled}
            >
              {startOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {formatHour(option.value)} {/* Display only HH */}
                </option>
              ))}
            </select>
          </div>

          {/* end time */}
          <div className={WRAPPER}>
            <label className={FORM_LABEL}>End Time</label>
            <select
              className={FORM_INPUT}
              value={endValue}
              onChange={handleEndChange}
              disabled={disabled}
            >
              {endOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {formatHour(option.value)} {/* Display only HH */}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTime;
