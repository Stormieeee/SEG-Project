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

interface Option {
  value: number;
  label: string;
}

const DateTime = () => {
  const [date, setDate] = useState("");
  const [startOptions, setStartOptions] = useState<Option[]>([]);
  const [endOptions, setEndOptions] = useState<Option[]>([]);
  const [startValue, setStartValue] = useState<number>(9); // Initialize with 9am
  const [endValue, setEndValue] = useState<number>(23);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const currentTime = new Date().getHours();
    setStartValue(currentTime);

    const generateOptions = () => {
      const availableOptions = [];

      // Generate options starting from the current local time
      for (let i = currentTime; i <= 23; i++) {
        availableOptions.push({ value: i, label: `${i}:00` });
      }

      setStartOptions(availableOptions);

      // Adjust the end time options based on the new start time
      const initialEndOptions = availableOptions.filter(
        (option) => option.value > currentTime
      );
      setEndOptions(availableOptions.slice(1));

      // Check if current time is outside the allowed range
      if (currentTime < 9 || currentTime > 23) {
        setDisabled(true);
      }
    };

    generateOptions();

    const interval = setInterval(generateOptions, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    const currentDate = new Date().toLocaleDateString("en-US"); // Get today's date in "mm/dd/yyyy" format

    // Convert both selectedDate and currentDate to mm/dd/yyyy format for comparison
    const formattedSelectedDate = new Date(selectedDate).toLocaleDateString(
      "en-US"
    );
    const formattedCurrentDate = new Date(currentDate).toLocaleDateString(
      "en-US"
    );

    // Check if the formatted selected date is not equal to the formatted current date
    if (formattedSelectedDate !== formattedCurrentDate) {
      // If it's not today's date, update the start time to 9am and end time to 11pm
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
  };

  const handleStartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setStartValue(newValue);

    if (endValue < newValue) {
      setEndValue(newValue);
    }

    // Update end time options based on the new start time
    const newEndOptions = startOptions.filter(
      (option) => option.value > newValue
    );
    setEndOptions(newEndOptions);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setEndValue(newValue);
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
          <button
            className=" bg-black-500 text-zinc-200 hover:bg-black-900 font-normal text-sm ml-auto my-2 items-center justify-center flex p-2 rounded-md"
            onClick={() => {
              // handleCheckAvailability
            }}
          >
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
              value={startValue}
              onChange={handleStartChange}
              disabled={disabled}
            >
              {startOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

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
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};


  // const handleCheckAvailability = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   // Check if OTP is correct
  //   try {
  //     const response = await fetch("http://localhost:8000/check_room_availability/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ room_id: , date: , start_time: , end_time: ,}),
  //     });

  //     if (response.ok) {

  //     } else {
  //       // OTP verification failed
  //       console.log("Check Availability Failed");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

export default DateTime;
