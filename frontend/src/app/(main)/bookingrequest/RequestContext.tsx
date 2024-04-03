// StateContext.js
"use client";
import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import getEmailFromSessionStorage from "../../Components/CommonFunction";

interface RequestContextType {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  requests: string[][];
  setRequests: React.Dispatch<React.SetStateAction<string[][]>>;
  selectedRowIndex: number;
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number>>;
  filteredRequests: string[][];
  setFilteredRequests: React.Dispatch<React.SetStateAction<string[][]>>;
  displayedRequests: string[][];
  setDisplayedRequests: React.Dispatch<React.SetStateAction<string[][]>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  shouldSort: boolean;
  setShouldSort: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValue: RequestContextType = {
  searchTerm: "",
  setSearchTerm: () => {},
  requests: [],
  setRequests: () => {},
  selectedRowIndex: -1,
  setSelectedRowIndex: () => {},
  filteredRequests: [],
  setFilteredRequests: () => {},
  displayedRequests: [],
  setDisplayedRequests: () => {},
  rowsPerPage: 10,
  setRowsPerPage: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  shouldSort: false,
  setShouldSort: () => {},
};

const RequestContext = createContext<RequestContextType>(defaultValue);

export const StateProvider = ({ children }: any) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [requests, setRequests] = useState<string[][]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
  const [filteredRequests, setFilteredRequests] = useState<string[][]>([]);
  const [displayedRequests, setDisplayedRequests] = useState<string[][]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldSort, setShouldSort] = useState<boolean>(false);

  const getRequestData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/get_booking_requests_accepter/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ UserID: getEmailFromSessionStorage() }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRequests(data);
        setFilteredRequests(data);
      }
    } catch (error) {
      console.error("Error fetching booking requests: ", error);
      throw error;
    }
  };

  useEffect(() => {
    getRequestData();
  }, []);

  return (
    <RequestContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        requests,
        setRequests,
        selectedRowIndex,
        setSelectedRowIndex,
        filteredRequests,
        setFilteredRequests,
        displayedRequests,
        setDisplayedRequests,
        rowsPerPage,
        setRowsPerPage,
        currentPage,
        setCurrentPage,
        shouldSort,
        setShouldSort,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useStateContext = () => useContext(RequestContext);
