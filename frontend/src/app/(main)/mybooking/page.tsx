"use client";
import React, { useState, useEffect } from "react";
import BookingSwitcher from "./BookingSwitcher";
import Sortbar from "./Sortbar";
import BookingComponents from "./BookingComponents";
import getEmailFromSessionStorage from "../../Components/CommonFunction";
import FeedbackForm from "./FeedbackForm";

const MyBookingPage = () => {
  const [isCurrentBooking, setIsCurrentBooking] = useState<boolean>(true);
  const [currentBookings, setCurrentBookings] = useState<string[][]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
  const [pastBookings, setPastBookings] = useState<string[][]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string>("");

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
        }

        const pastBookingsResult = await getBookings("past");
        if (pastBookingsResult) {
          setPastBookings(pastBookingsResult);
        }
      } catch (error) {
        console.error("Error fetching booking requests: ", error);
      }
    })();
    // setCurrentBookings([
    //   ["1", "Room 1", "2021-09-01", "14:00", "16:00", "Approved"],
    //   ["2", "Room 2", "2021-09-02", "14:00", "16:00", "Pending"],
    //   ["3", "Room 3", "2021-09-03", "14:00", "16:00", "Rejected"],
    //   ["1", "Room 1", "2021-09-01", "14:00", "16:00", "Approved"],
    //   ["2", "Room 2", "2021-09-02", "14:00", "16:00", "Pending"],
    //   ["3", "Room 3", "2021-09-03", "14:00", "16:00", "Rejected"],
    //   ["1", "Room 1", "2021-09-01", "14:00", "16:00", "Approved"],
    //   ["2", "Room 2", "2021-09-02", "14:00", "16:00", "Pending"],
    //   ["3", "Room 3", "2021-09-03", "14:00", "16:00", "Rejected"],
    //   ["1", "Room 1", "2021-09-01", "14:00", "16:00", "Approved"],
    //   ["2", "Room 2", "2021-09-02", "14:00", "16:00", "Pending"],
    //   ["3", "Room 3", "2021-09-03", "14:00", "16:00", "Rejected"],
    // ]);
    // setPastBookings([
    //   ["4", "Room 4", "2021-08-01", "14:00", "16:00", "Completed"],
    //   ["5", "Room 5", "2021-08-02", "14:00", "16:00", "Completed"],
    //   ["6", "Room 6", "2021-08-03", "14:00", "16:00", "Completed"],
    // ]);
  }, []);

  return (
    <div className="flex w-full h-full flex-col">
      <div className="relative flex h-10 mt-3 mb-5 items-center justify-center">
        <div className="absolute inset-x-10">
          <Sortbar
            bookings={isCurrentBooking ? currentBookings : pastBookings}
            setBookings={
              isCurrentBooking ? setCurrentBookings : setPastBookings
            }
            setSelectedRowIndex={setSelectedRowIndex}
          />
        </div>
        <div className="z-10">
          <BookingSwitcher
            isCurrentBooking={isCurrentBooking}
            setIsCurrentBooking={setIsCurrentBooking}
            setSelectedRowIndex={setSelectedRowIndex}
          />
        </div>
      </div>
      <div className="h-full">
        <BookingComponents
          selectedRowIndex={selectedRowIndex}
          setSelectedRowIndex={setSelectedRowIndex}
          isCurrentBooking={isCurrentBooking}
          bookings={isCurrentBooking ? currentBookings : pastBookings}
          setBookings={isCurrentBooking ? setCurrentBookings : setPastBookings}
          setShowForm={setShowForm}
          setSelectedBookingId={setSelectedBookingId}
        />
      </div>
      {showForm && (
        <FeedbackForm
          showForm={showForm}
          setShowForm={setShowForm}
          selectedBookingId={selectedBookingId}
        />
      )}
    </div>
  );
};
export default MyBookingPage;
