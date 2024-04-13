"use client";
import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import getEmailFromSessionStorage from "../../Components/CommonFunction";

interface MyBookingContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  bookings: string[][];
  setBookings: React.Dispatch<React.SetStateAction<string[][]>>;
  selectedRowIndex: number;
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number>>;
  isCurrentBooking: boolean;
  setIsCurrentBooking: React.Dispatch<React.SetStateAction<boolean>>;
  currentBookings: string[][];
  setCurrentBookings: React.Dispatch<React.SetStateAction<string[][]>>;
  pastBookings: string[][];
  setPastBookings: React.Dispatch<React.SetStateAction<string[][]>>;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBookingId: string;
  setSelectedBookingId: React.Dispatch<React.SetStateAction<string>>;
  bookingStatus: string;
  setBookingStatus: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  feedback: string;
  setFeedback: React.Dispatch<React.SetStateAction<string>>;
  bookingDetails?: {
    index: number;
    request_capacity: string;
    room_capacity: string;
    description: string;
    comment: string;
    feedback_title: string;
    feedback_text: string;
  } | null;
  setBookingDetails: React.Dispatch<
    React.SetStateAction<{
      index: number;
      request_capacity: string;
      room_capacity: string;
      description: string;
      comment: string;
      feedback_title: string;
      feedback_text: string;
    } | null>
  >;
}

const defaultValue: MyBookingContextType = {
  isLoading: false,
  setIsLoading: () => {},
  bookings: [],
  setBookings: () => {},
  selectedRowIndex: -1,
  setSelectedRowIndex: () => {},
  isCurrentBooking: true,
  setIsCurrentBooking: () => {},
  currentBookings: [],
  setCurrentBookings: () => {},
  pastBookings: [],
  setPastBookings: () => {},
  showForm: false,
  setShowForm: () => {},
  selectedBookingId: "",
  setSelectedBookingId: () => {},
  bookingStatus: "",
  setBookingStatus: () => {},
  title: "",
  setTitle: () => {},
  feedback: "",
  setFeedback: () => {},
  bookingDetails: null,
  setBookingDetails: () => {},
};

const MyBookingContext = createContext<MyBookingContextType>(defaultValue);

export const StateProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookings, setBookings] = useState<string[][]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
  const [isCurrentBooking, setIsCurrentBooking] = useState<boolean>(true);
  const [currentBookings, setCurrentBookings] = useState<string[][]>([]);
  const [pastBookings, setPastBookings] = useState<string[][]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string>("");
  const [bookingStatus, setBookingStatus] = useState<string>(""); // ["Pending", "Approved", "Rejected", "Completed"]
  const [title, setTitle] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [bookingDetails, setBookingDetails] = useState<{
    index: number;
    request_capacity: string;
    room_capacity: string;
    description: string;
    comment: string;
    feedback_title: string;
    feedback_text: string;
  } | null>(null);

  const getBookings = async (type: string) => {
    try {
      const response = await fetch(
        "http://localhost:8000/get_booking_requests_users/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UserID: getEmailFromSessionStorage(),
            checkType: type,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Error fetching booking requests: ", error);
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const currentBookingsResult = await getBookings("current");
        if (currentBookingsResult) {
          setCurrentBookings(currentBookingsResult);
          setBookings(currentBookingsResult);
        }

        const pastBookingsResult = await getBookings("past");
        if (pastBookingsResult) {
          setPastBookings(pastBookingsResult);
        }
      } catch (error) {
        console.error("Error fetching booking requests: ", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (isCurrentBooking) {
      setBookings(currentBookings);
    } else {
      setBookings(pastBookings);
    }
  }, [isCurrentBooking]);

  return (
    <MyBookingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        bookings,
        setBookings,
        selectedRowIndex,
        setSelectedRowIndex,
        isCurrentBooking,
        setIsCurrentBooking,
        currentBookings,
        setCurrentBookings,
        pastBookings,
        setPastBookings,
        showForm,
        setShowForm,
        selectedBookingId,
        setSelectedBookingId,
        bookingStatus,
        setBookingStatus,
        title,
        setTitle,
        feedback,
        setFeedback,
        bookingDetails,
        setBookingDetails,
      }}
    >
      {children}
    </MyBookingContext.Provider>
  );
};

export const useStateContext = () => useContext(MyBookingContext);
