import React, { useState } from "react";
import { useStateContext } from "./MyBookingContext";
import { buttonStyle } from "../style/MainStyle";

const Sortbar = () => {
  const { feedbackList, setFeedbackList, setSelectedRowIndex } = useStateContext();
  const [sortColumn, setSortColumn] = useState<string>("");
  const [disableSelect] = useState<boolean>(false);

  const handleSort = (
    event: React.ChangeEvent<HTMLSelectElement>,
    selectedColumn: number,
    columnType: string
  ) => {
    setSortColumn(event.target.value);

    // Sort the bookings based on the selected column
    const sortedBookings = feedbackList ? [...feedbackList] : [];
    sortedBookings.sort((a, b) => {
      // Compare the values in the selected column
      const columnA = a[selectedColumn];
      const columnB = b[selectedColumn];

      if (columnType === "string") {
        return columnA.localeCompare(columnB);
      } else if (columnType === "date") {
        return new Date(columnA).getTime() - new Date(columnB).getTime();
      } else {
        // Fallback comparison
        return columnA < columnB ? -1 : columnA > columnB ? 1 : 0;
      }
    });

    setFeedbackList(sortedBookings);
    setSelectedRowIndex(-1);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    // Disable the "Any" option
    if (selectedValue !== "" && selectedValue !== sortColumn) {
      (
        e.target.querySelector('option[value=""]') as HTMLOptionElement
      ).disabled = true;
    }
    setSortColumn(selectedValue);

    // Extract selected column and column type
    const [selectedColumn, columnType] = selectedValue.split(",");
    handleSort(e, parseInt(selectedColumn), columnType);
  };

  return (
    <div className="flex flex-row items-center space-x-2">
      <label htmlFor="sortColumn text-gray-700">Sort by:</label>
      <select
        id="sortColumn"
        value={sortColumn}
        onChange={(e) => handleSelectChange(e)}
        className={` ${buttonStyle} text-black-600 h-8  text-sm w-20`}
      >
        <option value="" disabled={disableSelect}>
          Any
        </option>
        <option value="0,string">Booking Id</option>
        <option value="1,string">Room</option>
        <option value="2,date">Date</option>
      </select>
    </div>
  );
};

export default Sortbar;