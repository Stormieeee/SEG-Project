import React, { useState, useRef } from "react";

interface SortbarProps {
  filteredRequests: string[][];
  setFilteredRequests: React.Dispatch<React.SetStateAction<string[][]>>;
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Sortbar = ({
  filteredRequests,
  setFilteredRequests,
  setSelectedRowIndex,
}: SortbarProps) => {
  const [sortColumn, setSortColumn] = useState<string>("");
  const [disableSelect] = useState<boolean>(false);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const previousColumnIndexRef = useRef<number>(-1);

  const handleSort = (
    event: React.ChangeEvent<HTMLSelectElement>,
    selectedColumn: number,
    columnType: string
  ) => {
    setSortColumn(event.target.value);
    if (selectedColumn === previousColumnIndexRef.current) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      // Reset the order when a different column is selected
      setOrder("asc");
    }
    previousColumnIndexRef.current = selectedColumn;

    // Sort the bookings based on the selected column
    const sortedBookings = filteredRequests ? [...filteredRequests] : [];
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
      return order === "asc" ? comparisonResult : -comparisonResult;
    });

    setFilteredRequests(sortedBookings);
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
    <div className="absolute inset-x-10">
      <label htmlFor="sortColumn text-gray-700">Sort by:</label>
      <select
        id="sortColumn"
        value={sortColumn}
        onChange={(e) => handleSelectChange(e)}
        className="mx-2 py-1 border rounded-md"
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
