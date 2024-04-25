import React, { useEffect, useState } from "react";
import { useStateContext } from "./MyBookingContext";
import LoadingSpinner from "@/app/Components/LoadingSpinner";

const FeedbackForm = () => {
  const {
    
    selectedRowIndex,
    selectedBookingId,
    setFeedbackDetails,
    feedbackStatus,
    title,
    feedback,
  } = useStateContext();
  const [newFeedback, setNewFeedback] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/create_Feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingID: selectedBookingId,
          title: newTitle,
          feedback: newFeedback,
        }),
      });

      if (response.ok) {
        alert("Feedback submitted successfully!");
        getNewDetails();
      } else {
        alert("Failed to submit feedback. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      throw error;
    }
    // TODO: Handle form submission
    setShowForm(false);
    setNewFeedback("");
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const getNewDetails = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/get_booking_details_users/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID: selectedBookingId,
            checkType: feedbackStatus,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFeedbackDetails({ selectedRowIndex, ...data });
      }
    } catch (error) {
      console.error("Error fetching booking request details: ", error);
      throw error;
    }
    setIsLoading(false);
  };
  useEffect(() => {
    setNewFeedback(feedback);
    setNewTitle(title);
  }, [showForm]);

  return (
    <>
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black-100 bg-opacity-50 z-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white-100 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Feedback Form</h2>
            <div className="flex items-center mb-4">
              <label className="font-bold mr-3">Booking ID: </label>
              <label>{selectedBookingId}</label>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="feedback" className="block mb-2">
                Please provide your feedback:
              </label>
              <input
                name="title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2 mb-5 border border-gray-300 rounded"
              />
              <textarea
                id="feedback"
                name="feedback"
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
                rows={5}
                cols={50}
                className="w-full h-32 p-2 leading-tight resize-none border border-gray-300 rounded"
                placeholder="Enter your feedback here..."
              ></textarea>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <div className="flex mt-4 justify-center items-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white-100 px-4 py-2 rounded mr-4"
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleClose}
                    className="bg-gray-500 text-white-100 px-4 py-2 rounded"
                  >
                    Close
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackForm;
