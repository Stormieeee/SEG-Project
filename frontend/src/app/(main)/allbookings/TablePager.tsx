import React, { useEffect } from "react";
import { useStateContext } from "./BookingContext";

const TablePager = () => {
  const {
    filteredBookings,
    rowsPerPage,
    currentPage,
    setCurrentPage,
    setRowsPerPage,
  } = useStateContext();
  const totalPages = Math.ceil(filteredBookings.length / rowsPerPage);

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  // Add the following useEffect to update the currentPage when the rowsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [rowsPerPage]);
  return (
    <div className="flex justify-end items-center mb-1">
      <span>Rows per page:</span>
      <select
        className="w-[50px] border ml-2 bg-white-100 text-end cursor-pointer"
        value={rowsPerPage}
        onChange={handleRowsPerPageChange}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
      <div className="mx-10">{`Page ${currentPage} of ${totalPages}`}</div>

      <button
        className={`mr-10 ${currentPage === 1 ? "text-gray-400" : "text-black cursor-pointer"}`}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      <button
        className={`${currentPage === totalPages ? "text-gray-400" : "text-black cursor-pointer"}`}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default TablePager;
