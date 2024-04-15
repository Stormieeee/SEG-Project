"use client";
import { useStateContext } from "./BookingContext";
import { useEffect } from "react";

const SearchBar = () => {
  const {
    bookings,
    setFilteredBookings,
    selectedRowIndex,
    setSelectedRowIndex,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    setShouldSort,
    isCurrentBooking,
    shouldRegenerate,
    setShouldRegenerate,
  } = useStateContext();
  const regenerateFilteredBookings = () => {
    if (bookings && searchTerm) {
      const filtered = bookings.filter((booking) =>
        booking.some((item) =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      console.log(filtered);
      setFilteredBookings(filtered);

      if (filtered.length === 0) {
        setSelectedRowIndex(-1);
      } else {
        if (selectedRowIndex >= 0) {
          setSelectedRowIndex(0);
        }
      }
    } else {
      setFilteredBookings(bookings);
    }
    setCurrentPage(1);
    setShouldSort(true);
    setShouldRegenerate(false);
  };
  // Get new filtered requests when search term changes
  useEffect(() => {
    console.log(searchTerm);
    regenerateFilteredBookings();
  }, [searchTerm, isCurrentBooking]);
  useEffect(() => {
    // console.log(searchTerm);
    if (shouldRegenerate) {
      regenerateFilteredBookings();
    }
  }, [shouldRegenerate, isCurrentBooking]);
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value.trim())}
      placeholder="Search"
      className="w-1/4 z-50 p-2 border border-black-100 rounded-md flex max-w-fit-content"
    />
  );
};

export default SearchBar;
