import React, { useState } from "react";

interface SortbarProps {
  requests: string[][];
  setRequests: React.Dispatch<React.SetStateAction<string[][]>>;
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Sortbar = ({
  requests,
  setRequests,
  setSelectedRowIndex,
}: SortbarProps) => {
  const [sortColumn, setSortColumn] = useState<string>("");
  const [disableSelect] = useState<boolean>(false);

  const handleSort = (
    event: React.ChangeEvent<HTMLSelectElement>,
    selectedColumn: number,
    columnType: string
  ) => {
    setSortColumn(event.target.value);

    // Sort the bookings based on the selected column
    const sortedBookings = requests ? [...requests] : [];
    sortedBookings.sort((a, b) => {
      // Compare the values in the selected column
      const columnA = a[selectedColumn];
      const columnB = b[selectedColumn];

      if (columnType === "string") {
        return columnA.localeCompare(columnB);
      } else if (columnType === "number") {
        return parseFloat(columnA) - parseFloat(columnB);
      } else if (columnType === "date") {
        return new Date(columnA).getTime() - new Date(columnB).getTime();
      } else {
        // Fallback comparison
        return columnA < columnB ? -1 : columnA > columnB ? 1 : 0;
      }
    });

    setRequests(sortedBookings);
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
    <div>
      <label htmlFor="sortColumn text-gray-700">Sort by:</label>
      <select
        id="sortColumn"
        value={sortColumn}
        onChange={(e) => handleSelectChange(e)}
        className="mx-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="" disabled={disableSelect}>
          Any
        </option>
        <option value="0,string">Booking Id</option>
        <option value="1,string">Room</option>
        <option value="2,date">Date</option>
        <option value="3,time">Start Time</option>
        <option value="4,time">End Time</option>
      </select>
    </div>
  );
};

export default Sortbar;
