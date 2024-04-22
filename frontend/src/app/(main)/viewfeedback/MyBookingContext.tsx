"use client";
import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

interface MyFeedbackContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  feedbacks: string[][];
  setFeedbacks: React.Dispatch<React.SetStateAction<string[][]>>;
  selectedRowIndex: number;
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number>>;
  isCurrentFeedback: boolean;
  setIsCurrentFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  currentFeedback: string[][];
  setCurrentFeedback: React.Dispatch<React.SetStateAction<string[][]>>;
  pastFeedback: string[][];
  setPastFeedback: React.Dispatch<React.SetStateAction<string[][]>>;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBookingId: string;
  setSelectedBookingId: React.Dispatch<React.SetStateAction<string>>;
  feedbackStatus: string;
  setFeedbackStatus: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  feedback: string;
  setFeedback: React.Dispatch<React.SetStateAction<string>>;

  feedbackDetails?: {
    index: number;
    request_capacity: string;
    room_capacity: string;
    description: string;
    comment: string;
    feedback_title: string;
    feedback_text: string;
  } | null;

  setFeedbackDetails: React.Dispatch<
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

const defaultValue: MyFeedbackContextType = {
  isLoading: false,
  setIsLoading: () => {},
  feedbacks: [],
  setFeedbacks: () => {},
  selectedRowIndex: -1,
  setSelectedRowIndex: () => {},
  isCurrentFeedback: true,
  setIsCurrentFeedback: () => {},
  currentFeedback: [],
  setCurrentFeedback: () => {},
  pastFeedback: [],
  setPastFeedback: () => {},
  showForm: false,
  setShowForm: () => {},
  selectedBookingId: "",
  setSelectedBookingId: () => {},
  feedbackStatus: "",
  setFeedbackStatus: () => {},
  title: "",
  setTitle: () => {},
  feedback: "",
  setFeedback: () => {},
  feedbackDetails: null,
  setFeedbackDetails: () => {},
};

const MyFeedbackContext = createContext<MyFeedbackContextType>(defaultValue);

export const StateProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedbacks, setFeedbacks] = useState<string[][]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
  const [isCurrentFeedback, setIsCurrentFeedback] = useState<boolean>(true);
  const [currentFeedback, setCurrentFeedback] = useState<string[][]>([]);
  const [pastFeedback, setPastFeedback] = useState<string[][]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [feedbackStatus , setFeedbackStatus] = useState<string>("");
  const [feedbackDetails, setFeedbackDetails] = useState<{
    index: number;
    request_capacity: string;
    room_capacity: string;
    description: string;
    comment: string;
    feedback_title: string;
    feedback_text: string;
  } | null>(null);

  const getFeedback = async (type: string) => {
    try {
      const response = await fetch("http://localhost:8000/get_Feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkType: type,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch feedback");
      }
    } catch (error) {
      console.error("Error fetching feedbacks: ", error);
      throw error;
    }
  };

  useEffect(() => { //set feedback base on current or past
    (async () => {
      try {
        const currentFeedback = await getFeedback("current");
        if (currentFeedback) {
          setCurrentFeedback(currentFeedback);
          setFeedback(currentFeedback);
        }

        const pastFeedback = await getFeedback("past");
        if (pastFeedback) {
          setPastFeedback(pastFeedback);
        }
      } catch (error) {
        console.error("Error fetching feedbacks: ", error);
      }
    })();
  }, []);

  useEffect(() => { //change current feedback view base on whether the page is current or past 
    if (isCurrentFeedback) {
      setFeedbacks(currentFeedback);
    } else {
      setFeedbacks(pastFeedback);
    }
  }, [isCurrentFeedback]);

  return (
    <MyFeedbackContext.Provider
      value={{
        isLoading,
        setIsLoading,
        feedbacks,
        setFeedbacks,
        selectedRowIndex,
        setSelectedRowIndex,
        isCurrentFeedback,
        setIsCurrentFeedback,
        currentFeedback,
        setCurrentFeedback,
        pastFeedback,
        setPastFeedback,
        showForm,
        setShowForm,
        selectedBookingId,
        setSelectedBookingId,
        title,
        setTitle,
        feedback,
        setFeedback,
        feedbackDetails,
        setFeedbackDetails,
        feedbackStatus,
        setFeedbackStatus
      }}
    >
      {children}
    </MyFeedbackContext.Provider>
  );
};

export const useStateContext = () => useContext(MyFeedbackContext);
