// StateContext.js
"use client";
import React, { createContext, use, useContext, useState } from "react";
import { useEffect } from "react";

interface BookingContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  bookings: string[][];
  setBookings: React.Dispatch<React.SetStateAction<string[][]>>;
  selectedRowIndex: number;
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number>>;
  filteredBookings: string[][];
  setFilteredBookings: React.Dispatch<React.SetStateAction<string[][]>>;
  displayedBookings: string[][];
  setDisplayedBookings: React.Dispatch<React.SetStateAction<string[][]>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setCurrentBookings: React.Dispatch<React.SetStateAction<string[][]>>;
  shouldSort: boolean;
  setShouldSort: React.Dispatch<React.SetStateAction<boolean>>;
  isCurrentBooking: boolean;
  setIsCurrentBooking: React.Dispatch<React.SetStateAction<boolean>>;
  shouldRegenerate: boolean;
  setShouldRegenerate: React.Dispatch<React.SetStateAction<boolean>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  bookingDetails: {
    bookingId: string;
    user_id: string;
    user_role: string;
    handler: string;
    request_capacity: number;
    room_capacity: number;
    description: string;
    comment: string;
  } | null;
  setBookingDetails: React.Dispatch<
    React.SetStateAction<{
      bookingId: string;
      user_id: string;
      user_role: string;
      handler: string;
      request_capacity: number;
      room_capacity: number;
      description: string;
      comment: string;
    } | null>
  >;
}

const defaultValue: BookingContextType = {
  isLoading: false,
  setIsLoading: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
  bookings: [],
  setBookings: () => {},
  selectedRowIndex: -1,
  setSelectedRowIndex: () => {},
  filteredBookings: [],
  setFilteredBookings: () => {},
  displayedBookings: [],
  setDisplayedBookings: () => {},
  rowsPerPage: 10,
  setRowsPerPage: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  setCurrentBookings: () => {},
  shouldSort: false,
  setShouldSort: () => {},
  isCurrentBooking: true,
  setIsCurrentBooking: () => {},
  shouldRegenerate: false,
  setShouldRegenerate: () => {},
  status: "",
  setStatus: () => {},
  bookingDetails: null,
  setBookingDetails: () => {},
};

const BookingContext = createContext<BookingContextType>(defaultValue);

export const StateProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [bookings, setBookings] = useState<string[][]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
  const [filteredBookings, setFilteredBookings] = useState<string[][]>([]);
  const [displayedBookings, setDisplayedBookings] = useState<string[][]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldSort, setShouldSort] = useState<boolean>(false);
  const [isCurrentBooking, setIsCurrentBooking] = useState<boolean>(true);
  const [currentBookings, setCurrentBookings] = useState<string[][]>([]);
  const [pastBookings, setPastBookings] = useState<string[][]>([]);
  const [shouldRegenerate, setShouldRegenerate] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [bookingDetails, setBookingDetails] = useState<{
    bookingId: string;
    user_id: string;
    user_role: string;
    handler: string;
    request_capacity: number;
    room_capacity: number;
    description: string;
    comment: string;
  } | null>(null);

  const getBookingData = async (type: string) => {
    try {
      const response = await fetch(
        "http://localhost:8000/get_All_Bookings_Admin/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ typeCheck: type }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Error fetching all bookings: ", error);
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const currentBookingsResult = await getBookingData("current");
        if (currentBookingsResult) {
          setCurrentBookings(currentBookingsResult);
        }

        const pastBookingsResult = await getBookingData("past");
        if (pastBookingsResult) {
          setPastBookings(pastBookingsResult);
        }
        setBookings(currentBookingsResult);
        setShouldRegenerate(true);
      } catch (error) {
        console.error("Error fetching booking: ", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (isCurrentBooking) {
      setBookings(currentBookings);
    } else {
      setBookings(pastBookings);
    }
    setShouldRegenerate(true);
  }, [isCurrentBooking]);

  return (
    <BookingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        searchTerm,
        setSearchTerm,
        bookings,
        setBookings,
        selectedRowIndex,
        setSelectedRowIndex,
        filteredBookings,
        setFilteredBookings,
        displayedBookings,
        setDisplayedBookings,
        rowsPerPage,
        setRowsPerPage,
        currentPage,
        setCurrentPage,
        setCurrentBookings,
        shouldSort,
        setShouldSort,
        isCurrentBooking,
        setIsCurrentBooking,
        shouldRegenerate,
        setShouldRegenerate,
        status,
        setStatus,
        bookingDetails,
        setBookingDetails,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useStateContext = () => useContext(BookingContext);
