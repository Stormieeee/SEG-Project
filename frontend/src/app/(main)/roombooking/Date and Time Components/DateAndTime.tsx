import React, { useEffect, useState } from "react";
import {
  FORM_CONTAINER,
  FormHeader,
  FORM_INPUT,
  FORM_LABEL,
  WRAPPER,
} from "../ComponentFormat";

import datetimeLogo from "../../../../../public/Components-icon/Datetime Logo.svg";
import { getCurrentDate, formatHour } from "../utils/commonFunction";
import { useStateContext } from "../../StateContext";
interface Option {
  value: number;
  label: string;
}

const DateTime = ({ fetchData }: any) => {
  const [startOptions, setStartOptions] = useState<Option[]>([]);
  const [endOptions, setEndOptions] = useState<Option[]>([]);
  const [disabled, setDisabled] = useState(false);

  const { date, setDate, startTime, setStartTime, endTime, setEndTime } =
    useStateContext();

  useEffect(() => {
    const generateOptions = () => {
      const currentTime = new Date().getHours(); //current time
      const isCurrentDate = date === getCurrentDate(); //boolean for if date selected is same as current date
      const isOutOfTimeRange = currentTime < 9 || currentTime > 23; //boolean for current time is < 9 or > 23

      if (!isOutOfTimeRange && isCurrentDate) {           //if its not out of range and is today's date then initiate option with current time
        setDisabled(false);
        const availableOptions = [];
        for (let i = currentTime; i <= 23; i++) {
          availableOptions.push({ value: i, label: ` ${i}:00 `});
        }
        setStartOptions(availableOptions);
        setEndOptions(availableOptions.slice(1));
      }else if(!isCurrentDate){ //else if date is not today's date then initiate option with 9am
        setDisabled(false);
        const availableOptions = [];
        for (let i = 9; i <= 23; i++) {
          availableOptions.push({ value: i, label: ` ${i}:00 `});
        }
        setStartOptions(availableOptions);
        setEndOptions(availableOptions.slice(1));
      }else{                                              //else set disabled if out of time range and today's date
        setDisabled(true); 
      }
    };


    generateOptions();
    const interval = setInterval(generateOptions, 60000);

    return () => clearInterval(interval);
  }, [date]);

  //Change Date
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    
    if (selectedDate !== getCurrentDate()) {

      const availableOptions: Option[] = [];
      for (let i = 9; i <= 23; i++) {
        availableOptions.push({ value: i, label: `${i}:00` });
      }
      setStartTime(9); 
      setEndTime(10);
      setStartOptions(availableOptions);
      setEndOptions(availableOptions.slice(1));
    } else {
      const currentTime = new Date().getHours();
      const availableOptions: Option[] = [];
      for (let i = currentTime; i <= 23; i++) {
        availableOptions.push({ value: i, label: `${i}:00` });
      }
      setStartTime(currentTime);
      setEndTime(currentTime);
      setStartOptions(availableOptions);
      setEndOptions(availableOptions.slice(1)); 
    }
    
    setDate(selectedDate);
  };

  //Update Start time value
  const handleStartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setStartTime(newValue);

    if (endTime < newValue) {
      setEndTime(newValue);
    }

    const newEndOptions = startOptions.filter(
      (option) => option.value > newValue
    );
    setEndOptions(newEndOptions);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setEndTime(newValue);
  };

  return (
    <div className={`${FORM_CONTAINER}`}>
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
              event.preventDefault();
              fetchData(date, startTime, endTime);
            }}
            className="ml-auto"
          >
            <button
              className="bg-black-500 text-zinc-200 hover:bg-black-900 font-normal text-sm my-2 items-center justify-center flex p-2 rounded-md flex-auto "
              type="submit"
              disabled={disabled}
            >
              Check Availability
            </button>
          </form>
        </div>

        {/* form */}
        <div className="flex h-full py-6 justify-between space-x-6">
          {/* date */}
          <div className={WRAPPER}>
            <label className={FORM_LABEL}>Date</label>
            <input
              className={`${FORM_INPUT} `}
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
              value={startTime}
              onChange={handleStartChange}
              disabled={disabled} // Disable input when disabled
            >
              {startOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.value + ":" + "00"}
                </option>
              ))}
            </select>
          </div>

          {/* end time */}
          <div className={WRAPPER}>
            <label className={FORM_LABEL}>End Time</label>
            <select
              className={FORM_INPUT}
              value={endTime}
              onChange={handleEndChange}
              disabled={disabled}
            >
              {endOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.value + ":" + "00"}
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
