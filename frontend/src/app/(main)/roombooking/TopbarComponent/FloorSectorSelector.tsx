"use client";

import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../StateContext";

const floorList = [{ floor: "2" }, { floor: "3" }];
const sectionList = [{ section: "R" }, { section: "L" }];

const FloorSectorSelector = () => {
  const { floor, setFloor, floorSection, setFloorSection } = useStateContext();
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
    console.log(floor)
    setFloorOpened(false); // Close the dropdown after selecting a floor
  };
  const handleSelectSection = (selectedFloor: any) => {
    setFloorSection(selectedFloor);
    console.log(floorSection)
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

  const buttonStyle =
    `py-[0.4rem] px-[2.25rem] w-24 rounded-md bg-white-300 
    text-lg font-medium 
    duration-200
    hover:bg-white-600 
    active:scale-95 active:duration-100
    focus:outline-none`;

    const dropdownStyle = `absolute top-full left-0 w-full backdrop-blur-sm border border-gray-300 mt-1 rounded-md shadow-lg max-h-40 overflow-y-auto`;
    
  return (
    <div
      className="flex flex-row items-center justify-center"
      ref={selectorRef}
    >
      <div className="relative justify-between px-2">
        {" "}
        {/* floor */}
        <button onClick={handleFloorToggle} className={`${buttonStyle}`}>
          <span className="text-black-500">{floor}</span>
        </button>
        {isFloorOpened && (
          <div className={`${dropdownStyle}`}>
            {floorList.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelectFloor(item.floor)}
                className="block w-full pl-2 py-1 text-left focus:outline-none text-lg hover:bg-gray-100 duration-100 hover:transition-colors"
              >
                {item.floor}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative justify-between px-2">
        {" "}
        {/* section */}
        <button onClick={handleSectionToggle} className={`${buttonStyle}`}>
          <span className="text-black-500">{floorSection}</span>
        </button>
        {isSectionOpened && (
          <div className={`${dropdownStyle}`}>
            {sectionList.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelectSection(item.section)}
                className="block w-full pl-2 py-1 text-left focus:outline-none text-lg hover:bg-gray-100 duration-100 hover:transition-colors"
              >
                {item.section}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloorSectorSelector;
