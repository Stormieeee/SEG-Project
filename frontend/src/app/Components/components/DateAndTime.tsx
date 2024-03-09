"use client";
import React, { useState } from 'react';
import ComponentTitle from "./ComponentTitle";
import { FORM_CONTAINER, FORM_INPUT, FORM_LABEL, WRAPPER } from "./ComponentFormat";

const DateTime = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('12:00 PM');
  const [endTime, setEndTime] = useState('12:00 PM');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEndTime(event.target.value);
  };

  const timeOptions = ["12:00 PM", "1:00 PM", "2:00 PM"];

  return (
    <div className={FORM_CONTAINER}>
      <div className="flex-col flex-grow h-full">
        <ComponentTitle title='1 Date and Time' image='/Components-icon/Datetime Logo.svg' altImg='Datetime logo'/>
        <div className='flex h-full py-5'>
          <div className={WRAPPER}>
            <label className={FORM_LABEL}>Date</label>
            <input className={FORM_INPUT} type="date" value={date} onChange={handleDateChange}/>
          </div>

          <div className={WRAPPER}>
            <label className={FORM_LABEL}>Start Time</label>
            <select className={FORM_INPUT} value={startTime} onChange={handleStartTimeChange}>
              {timeOptions.map((timeOption, index) => (
                <option key={index} value={timeOption}>{timeOption}</option>
              ))}
            </select>
          </div>
        
          <div className={WRAPPER}>
            <label className={FORM_LABEL}>End Time</label>
            <select className={FORM_INPUT} value={endTime} onChange={handleEndTimeChange}>
              {timeOptions.map((timeOption, index) => (
                <option key={index} value={timeOption}>{timeOption}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTime;
