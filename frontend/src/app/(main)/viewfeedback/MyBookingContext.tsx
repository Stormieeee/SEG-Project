"use client";
import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

interface MyFeedbackContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  feedbackList: string[][];
  setFeedbackList: React.Dispatch<React.SetStateAction<string[][]>>;
  selectedRowIndex: number;
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number>>;
  isCurrentFeedback: boolean;
  setIsCurrentFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  currentFeedbackList: string[][];
  setCurrentFeedbackList: React.Dispatch<React.SetStateAction<string[][]>>;
  pastFeedbackList: string[][];
  setPastFeedbackList: React.Dispatch<React.SetStateAction<string[][]>>;
  feedbackStatus: string;
  setFeedbackStatus: React.Dispatch<React.SetStateAction<string>>;
  feedback: string;
  setFeedback: React.Dispatch<React.SetStateAction<string>>;

  feedbackDetails?: {
    index: number;
    roomID: string;
    title: string;
    request_capacity: string;
    room_capacity: string;
    description: string;
  } | null;

  setFeedbackDetails: React.Dispatch<
    React.SetStateAction<{
      index: number;
      roomID: string;
      title: string;
      request_capacity: string;
      room_capacity: string;
      description: string;
    } | null>
  >;
}

const defaultValue: MyFeedbackContextType = {
  isLoading: false,
  setIsLoading: () => {},
  feedbackList: [],
  setFeedbackList: () => {},
  selectedRowIndex: -1,
  setSelectedRowIndex: () => {},
  isCurrentFeedback: true,
  setIsCurrentFeedback: () => {},
  currentFeedbackList: [],
  setCurrentFeedbackList: () => {},
  pastFeedbackList: [],
  setPastFeedbackList: () => {},
  feedbackStatus: "",
  setFeedbackStatus: () => {},
  feedback: "",
  setFeedback: () => {},
  feedbackDetails: null,
  setFeedbackDetails: () => {},
};

const MyFeedbackContext = createContext<MyFeedbackContextType>(defaultValue);

export const StateProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedbackList, setFeedbackList] = useState<string[][]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
  const [isCurrentFeedback, setIsCurrentFeedback] = useState<boolean>(false);
  const [currentFeedbackList, setCurrentFeedbackList] = useState<string[][]>(
    []
  );
  const [pastFeedbackList, setPastFeedbackList] = useState<string[][]>([]);
  const [title, setTitle] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [feedbackStatus, setFeedbackStatus] = useState<string>("");
  const [feedbackDetails, setFeedbackDetails] = useState<{
    index: number;
    roomID: string;
    title: string;
    request_capacity: string;
    room_capacity: string;
    description: string;
  } | null>(null);

  const getFeedback = async (type: string) => {
    try {
      const response = await fetch("http://localhost:8000/get_Feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typeCheck: type,
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

  useEffect(() => {
    //set feedback base on current or past
    (async () => {
      try {
        const currentFeedback = await getFeedback("current");
        if (currentFeedback) {
          setCurrentFeedbackList(currentFeedback);
        }

        const pastFeedback = await getFeedback("past");
        if (pastFeedback) {
          setPastFeedbackList(pastFeedback);
        }
        setIsCurrentFeedback(true);
        } catch (error) {
        console.error("Error fetching feedbacks: ", error);
      }
    })();
  }, []);

  useEffect(() => {
    //change current feedback view base on whether the page is current or past
    if (isCurrentFeedback) {
      setFeedbackList(currentFeedbackList);
    } else {
      setFeedbackList(pastFeedbackList);
    }
  }, [isCurrentFeedback]);

  return (
    <MyFeedbackContext.Provider
      value={{
        isLoading,
        setIsLoading,
        feedbackList,
        setFeedbackList,
        selectedRowIndex,
        setSelectedRowIndex,
        isCurrentFeedback,
        setIsCurrentFeedback,
        currentFeedbackList,
        setCurrentFeedbackList,
        pastFeedbackList,
        setPastFeedbackList,
        feedback,
        setFeedback,
        feedbackDetails,
        setFeedbackDetails,
        feedbackStatus,
        setFeedbackStatus,
      }}
    >
      {children}
    </MyFeedbackContext.Provider>
  );
};

export const useStateContext = () => useContext(MyFeedbackContext);
