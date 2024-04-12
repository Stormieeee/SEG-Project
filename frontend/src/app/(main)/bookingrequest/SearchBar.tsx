"use client";
import { useStateContext } from "./RequestContext";
import { useEffect } from "react";

const SearchBar = () => {
  const {
    requests,
    setFilteredRequests,
    selectedRowIndex,
    setSelectedRowIndex,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    setShouldSort,
  } = useStateContext();
  // Get new filtered requests when search term changes
  useEffect(() => {
    console.log(searchTerm);
    if (requests && searchTerm) {
      const filtered = requests.filter(
        (request) =>
          request[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
          request[1].toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(filtered);
      setFilteredRequests(filtered);

      if (filtered.length === 0) {
        setSelectedRowIndex(-1);
      } else {
        if (selectedRowIndex >= 0) {
          setSelectedRowIndex(0);
        }
      }
    } else {
      setFilteredRequests(requests);
    }
    setCurrentPage(1);
    setShouldSort(true);
  }, [searchTerm]);
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value.trim())}
      placeholder="Search by Booking ID or Room..."
      className="w-1/2 ml-5 z-50 p-2 border border-black-100 rounded-md focus:placeholder-transparent focus:outline-none "
    />
  );
};

export default SearchBar;
