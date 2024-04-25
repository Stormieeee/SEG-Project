"use client";

import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../StateContext";
import {
  buttonStyle,
  dropdownHoverStyle,
  dropdownStyle,
} from "../../style/MainStyle";
import { getDataFromServer } from "../utils/utils";
import { adjustTime, formatHour } from "../utils/commonFunction";

const floorList = [{ floor: "2" }, { floor: "3" }];
const sectionList = [{ section: "R" }, { section: "L" }];

const FloorSectorSelector = () => {
  const { floor, setFloor, floorSection, setFloorSection ,date,capacity,startTime,endTime,setFetchedData} = useStateContext();
  const [isFloorOpened, setFloorOpened] = useState(false);
  const [isSectionOpened, setSectionOpened] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  const handleFloorToggle = () => {
    setFloorOpened(!isFloorOpened);
  };
  const handleSectionToggle = () => {
    setSectionOpened(!isSectionOpened);
  };

  const handleSelectFloor = (selectedFloor: any) => {
    setFloor(selectedFloor);
    setFloorOpened(false); // Close the dropdown after selecting a floor
  };
  const handleSelectSection = (selectedFloor: any) => {
    setFloorSection(selectedFloor);
    setSectionOpened(false); // Close the dropdown after selecting a section
  };

  useEffect(() => {
    //If mouse clicked outside other than button, it closes the dropdown menu
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setFloorOpened(false);
        setSectionOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="flex flex-row items-center justify-center space-x-4"
      ref={selectorRef}
    >
      <div className="relative flex-row justify-between px-2">
        {/* floor */}
        <div className="flex flex-row items-center space-x-1">
          <span className="font-medium text-zinc-700">Floor:</span>
          <button onClick={handleFloorToggle} className={`${buttonStyle}`} style={{ width: "75px", height: "40px" }}>
            <span className="text-gray-700">{floor}</span>
            {isFloorOpened ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#374151"
                className="w-5 h-5 flex"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#374151"
                className="w-5 h-5 flex"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </button>
          {isFloorOpened && (
            <div className={`${dropdownStyle} p-1`}>
              {floorList.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectFloor(item.floor)}
                  className={`${dropdownHoverStyle} ${index === 0 ? "border-r rounded-l-md" : "rounded-r-md"}`}
                >
                  {item.floor}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative justify-between px-2">
        {/* section */}
        <div className="flex flex-row items-center space-x-1 flex-grow-0">
          <span className="font-medium text-zinc-700">Section:</span>
          <button onClick={handleSectionToggle} className={`${buttonStyle}`} style={{ width: "75px", height: "40px" }}>
            <span className="text-gray-700">{floorSection}</span>
            {isSectionOpened ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#374151"
                className="w-5 h-5 flex"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#374151"
                className="w-5 h-5 flex"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </button>
          {isSectionOpened && (
            <div className={`${dropdownStyle} p-1`}>
              {sectionList.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectSection(item.section)}
                  className={`${dropdownHoverStyle} ${index === 0 ? "border-r rounded-l-md" : "rounded-r-md"}`}
                >
                  {item.section}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloorSectorSelector;
