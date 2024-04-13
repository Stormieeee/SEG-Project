// StateContext.js
"use client";
import React, { createContext, useContext, useState } from "react";
import { getCurrentDate } from "./roombooking/utils/commonFunction";

interface StateContextType {
  roomID: string;
  setRoomID: React.Dispatch<React.SetStateAction<string>>;
  capacity: number;
  setCapacity: React.Dispatch<React.SetStateAction<number>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  startTime: number;
  setStartTime: React.Dispatch<React.SetStateAction<number>>;
  endTime: number;
  setEndTime: React.Dispatch<React.SetStateAction<number>>;
  floor: string;
  setFloor: React.Dispatch<React.SetStateAction<string>>;
  floorSection: string;
  setFloorSection: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValue: StateContextType = {
  roomID: "3R023",
  setRoomID: () => {},
  capacity: 40,
  setCapacity: () => {},
  description: "Description",
  setDescription: () => {},
  date: getCurrentDate(),
  setDate: () => {},
  startTime: new Date().getHours(),
  setStartTime: () => {},
  endTime: new Date().getHours() + 1,
  setEndTime: () => {},
  floor: "3",
  setFloor: () => {},
  floorSection: "R",
  setFloorSection: () => {},
};

const StateContext = createContext<StateContextType>(defaultValue);

export const StateProvider = ({ children }: any) => {
  const [roomID, setRoomID] = useState<string>(defaultValue.roomID);
  const [capacity, setCapacity] = useState<number>(defaultValue.capacity);
  const [description, setDescription] = useState<string>(
    defaultValue.description
  );
  const [date, setDate] = useState<string>(defaultValue.date);
  const [startTime, setStartTime] = useState<number>(new Date().getHours());
  const [endTime, setEndTime] = useState<number>(new Date().getHours() + 1);
  const [floor, setFloor] = useState<string>("3");
  const [floorSection, setFloorSection] = useState<string>("R");

  return (
    <StateContext.Provider
      value={{
        roomID,
        setRoomID,
        capacity,
        setCapacity,
        description,
        setDescription,
        date,
        setDate,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        floor,
        setFloor,
        floorSection,
        setFloorSection,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
