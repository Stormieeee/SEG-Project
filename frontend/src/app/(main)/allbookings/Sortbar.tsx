import React, { useState, useEffect } from "react";
import { useStateContext } from "./BookingContext";
import { buttonStyle } from "../style/MainStyle";

const Sortbar = () => {
  const [sortColumn, setSortColumn] = useState<string>("");
  const [disableSelect] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<number>(-1);
  const [columnType, setColumnType] = useState<string>("");
  const {
    bookings,
    filteredBookings,
    setFilteredBookings,
    setSelectedRowIndex,
    setCurrentPage,
    shouldSort,
    setShouldSort,
  } = useStateContext();
  const handleSort = () => {
    // Sort the bookings based on the selected column
    console.log(sortColumn);
    const sortedBookings = filteredBookings ? [...filteredBookings] : [];
    sortedBookings.sort((a, b) => {
      // Compare the values in the selected column
      const columnA = a[selectedColumn];
      const columnB = b[selectedColumn];
      let comparisonResult = 0;
      if (columnType === "string") {
        comparisonResult = columnA.localeCompare(columnB);
      } else if (columnType === "number") {
        comparisonResult = parseFloat(columnA) - parseFloat(columnB);
      } else if (columnType === "date") {
        comparisonResult =
          new Date(columnA).getTime() - new Date(columnB).getTime();
      } else {
        // Fallback comparison
        comparisonResult = columnA < columnB ? -1 : columnA > columnB ? 1 : 0;
      }
      return comparisonResult;
    });

    setFilteredBookings(sortedBookings);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    // Disable the "Any" option
    if (selectedValue !== "" && selectedValue !== sortColumn) {
      (
        e.target.querySelector('option[value=""]') as HTMLOptionElement
      ).disabled = true;
    }
    setSelectedColumn(parseInt(selectedValue.split(",")[0]));
    setColumnType(selectedValue.split(",")[1]);
    setSortColumn(selectedValue);
  };

  useEffect(() => {
    handleSort();
    setCurrentPage(1);
    setSelectedRowIndex(-1);
  }, [sortColumn]);
  useEffect(() => {
    if (shouldSort) {
      handleSort();
      setShouldSort(false); // Reset the flag after sorting
    }
  }, [filteredBookings, sortColumn, shouldSort]);

  return (
    <div className="flex flex-row items-center space-x-2">
      <label htmlFor="sortColumn" className="hidden lg:block text-gray-700">
        Sort by:
      </label>
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
        <option value="3,time">Start Time</option>
        <option value="4,time">End Time</option>
        <option value="5,string">Status</option>
      </select>
    </div>
  );
};

export default Sortbar;
