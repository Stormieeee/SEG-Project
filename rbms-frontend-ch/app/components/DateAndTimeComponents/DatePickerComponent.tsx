"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  return (
    <div className="mt-1">
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="DD/MM/YYYY"
        className="rounded-lg bg-blue-100 h-12 w-36 text-blue-500 text-center"
      />
    </div>
  );
};

export default DatePickerComponent;
