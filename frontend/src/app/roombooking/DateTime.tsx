"use client";
import React, { useState } from 'react';
import './datetime.css';
import Image from 'next/image';
import dateTime from '../../../../public/Components-icon/Datetime Logo.svg'

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

  return (
    <div className="form-container">
      <h1 className="form-header">
        <a className='font-bold'>1</a> Date and Time <Image src={dateTime} alt="Date Time Logo"/>
      </h1>
      <div className='wrapper'>
          <label className="form-label">Date</label>
          <label className="form-label">Start Time</label>
          <label className="form-label">End Time</label>
          <input className="form-input" type="text" placeholder="DD/MM/YYYY" value={date} onChange={handleDateChange} />
          <select className="form-input" value={startTime} onChange={handleStartTimeChange}>
            <option value="12:00 PM">12:00 PM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
          </select>
          <select className="form-input" value={endTime} onChange={handleEndTimeChange}>
            <option value="12:00 PM">12:00 PM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
          </select>
        </div>
    </div>
  );
};

export default DateTime;