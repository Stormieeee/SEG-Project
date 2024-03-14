"use client";
import React, { useState } from "react";
import {
  FORM_CONTAINER,
  FormHeader,
  FORM_INPUT,
  FORM_LABEL,
  WRAPPER,
} from "../ComponentFormat";
import datetimeLogo from "../../../../../public/Components-icon/Datetime Logo.svg";
import Image from "next/image";


//get Date
var getDate = new Date()
var currentHour = getDate.getHours();
var currentDate = getDate.getDate();


const [date, setDate] = useState("");
const [startTime, setStartTime] = useState(currentHour.toString());
const [endTime, setEndTime] = useState((currentHour+1).toString());

function getStartTime(){
  return startTime
}

//return current hour in 4
function startTimeOptions () {
  var timeList = new Array()
  var currentTime = changeTimeFormat(currentHour);
  for (let i = 0; i < 4; i++) {
    timeList.push(changeTimeFormat(currentTime + i));
  }
  console.log(timeList)
  return timeList;
}
//return current hour + 1hour in 4
function endTimeOptions(){
  var timeList = startTimeOptions()
  for (let i = 0; i < timeList.length; i++) {
    var curTime = timeList[i]
    if(curTime+1 > 12){
      timeList[i] = changeTimeFormat(curTime)
    }else{
      timeList[i] += 1;
    }
    
  }
  console.log(timeList)
  return timeList
}
function changeTimeFormat (time: number){
  if(time > 12){
    time -= 12 
  }else if (time == 12){
    time = 0x0;
  }
  return time
}

const DateTime = () => {
  console.log(currentHour);
  console.log(currentDate);


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

  const startTimeList = startTimeOptions();
  const endTimeList = endTimeOptions();

  return (
    <div className={FORM_CONTAINER}>
      <div className="flex-col flex-grow h-full justify-center">
        <div className="flex items-center flex-row grow">
          <FormHeader id="1" title="Date and Time" imgPath={datetimeLogo} imgAlt="Date Time Logo" />
          <button className=" bg-black-500 text-zinc-200 hover:bg-black-900 font-normal text-sm ml-auto my-2 items-center justify-center flex p-2 rounded-md"
          onClick={() => { 
            // handleCheckAvailability
          }}>
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
              {startTimeList.map((timeOption, index) => (
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
              {endTimeList.map((timeOption, index) => (
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
