// components/TimePickerComponent.tsx

"use client";

import React, { useState } from "react";

const TimePickerComponent: React.FC = () => {
  const [hours, setHours] = useState<string>("12");
  const [minutes, setMinutes] = useState<string>("00");
  const [period, setPeriod] = useState<string>("PM");

  const handleHoursChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHours(event.target.value);
  };

  const handleMinutesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMinutes(event.target.value);
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(event.target.value);
  };

  return (
    <div className="flex items-center mt-1 bg-blue-100 rounded-lg h-12 w-40 p-2">
      <select
        value={hours}
        onChange={handleHoursChange}
        className="bg-blue-100 rounded text-blue-500 h-10"
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
          <option key={hour}>{hour.toString().padStart(2, "0")}</option>
        ))}
      </select>
      <span className="text-gray-600">:</span>
      <select
        value={minutes}
        onChange={handleMinutesChange}
        className="bg-blue-100 text-blue-500 rounded h-10"
      >
        {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
          <option key={minute}>{minute.toString().padStart(2, "0")}</option>
        ))}
      </select>
      <select
        value={period}
        onChange={handlePeriodChange}
        className="bg-blue-100 text-blue-500 rounded h-10"
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};

export default TimePickerComponent;
