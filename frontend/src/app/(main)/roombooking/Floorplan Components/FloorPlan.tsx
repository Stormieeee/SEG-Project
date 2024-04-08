"use client";

// import React, { useState } from "react";
// import fullBookedIcon from "../../../../../public/Room-icon/Fully Booked Logo.svg";
// import Image from "next/image";
// //Test List of Rooms
// const roomid = [
//   {
//     roomID: "2R008",
//     status: false,
//     date: "2024-13-03",
//     start_time: 9,
//     end_time: 10,
//   },
//   {
//     roomID: "2R009",
//     status: true,
//     date: "2024-13-03",
//     start_time: 9,
//     end_time: 10,
//   },
// ];

// const handlesRoomUpdate = () =>{

// }
//   // const [checkStatus, setCheckStatus] = useState("");
// const FloorPlan = () => {

//   return (
//     <div className="bg-white-50 border border-neutral-400 rounded-2xl h-full p-5">
//       <div className="m-2 flex flex-row">
//         {roomid.map((room, index) => {
//           if (room.status == false) {
//             return (
//               <div
//                 key={index}
//                 className=" bg-primary-50 border-2 border-primary-200 rounded-md py-16 px-7 mx-2 flex flex-col align-bottom items-center"
//               >
//                 <p className="flex">{room.roomID}</p>
//               </div>
//             );
//           } else {
//             return (
//               <div key={index} className=" bg-red-50 border-2 border-red-400 rounded-md py-16 px-7 mx-2 flex flex-col align-bottom justify-center items-center">
//                 <Image src = {fullBookedIcon} alt="Fully Booked Icon" className="mb-10"/>
//                 <p className="flex justify-center items-end">{room.roomID}</p>
//               </div>
//             );
//           }
//         })}
//       </div>
//     </div>
//   );
// };

// export default FloorPlan;

import React, { useEffect, useState } from "react";
import Image from "next/image"
import stairs from "../../../../../public/FloorPlan-icon/stair-icon.svg"
import toilet from "../../../../../public/FloorPlan-icon/wc-sign-svgrepo-com.svg"
import lift from "../../../../../public/FloorPlan-icon/elevator-svgrepo-com.svg"

interface FloorPlanProps {
  setRoomID: (RoomID: string) => void;
  dataFromApi: any;
}

const FloorPlan: React.FC<FloorPlanProps> = ({ setRoomID, dataFromApi }) => {
  const fetchData = dataFromApi;
  const roomStatus = fetchData.dataFromApi.available;
  console.log(roomStatus);
  // State variable to track the active button
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const colorMap = Object.fromEntries(roomStatus);
  // Function to handle button click
  const handleButtonClick = (buttonKey: string) => {
    setActiveButton(buttonKey === activeButton ? null : buttonKey);
    setRoomID(buttonKey === activeButton ? "" : buttonKey);
  };
  const getButtonColorClass = (color: string) => {
    switch (color) {
      case "green":
        return "bg-primary-50 border border-primary-200 hover:bg-primary-100";
      case "red":
        return "bg-red-50 border border-red-400";
      case "yellow":
        return "bg-yellow-50 border border-yellow-400 hover:bg-yellow-100";
      default:
        return "bg-black-50";
    }
  };

  const getButtonDisabledState = (color: string) => {
    switch (color) {
      case "green":
      case "yellow":
        return false;
      default:
        return true;
    }
  };

  const iconStyle = `h-[2rem] w-[2rem] justify-center items-center m-1`;

  const getActiveButtonClass = (isActive: boolean, color: string) => {
    let backgroundColorClass = "";
    if (isActive) {
      switch (color) {
        case "green":
          backgroundColorClass =
            "bg-primary-400 border-primary-600 border-2 hover:bg-primary-200";
          break;
        case "red":
          backgroundColorClass = "bg-red-300 border-red-600 border-2";
          break;
        case "yellow":
          backgroundColorClass =
            "bg-yellow-300 border-yellow-600 border-2 hover:bg-yellow-200 ";
          break;
        default:
          backgroundColorClass = "bg-black-50";
          break;
      }
    }
    return backgroundColorClass;
  };

  const SecondFloor = ({ dataFromApi }: { dataFromApi: any }) => {
    return (
      <div className="bg-white border border-gray-300 rounded-2xl h-full p-1.5 flex flex-col">
        <div className="flex flex-row h-[130px]">
          <div className="flex flex-row w-1/5">
            <div className="flex flex-col w-1/3">
              <button className="relative h-[60px] w-full  border-2">
                <span className="block transform -rotate-90 text-xs origin-center">
                  2R008
                </span>
              </button>

              <button className="relative h-[60px] w-full mt-auto  border-2">
                <span className="block transform -rotate-90 text-xs origin-center">
                  2R007
                </span>
              </button>
            </div>

            <div className="flex flex-col w-1/3 ml-auto">
              <button className="relative h-[40px] w-full mt-auto border-2">
                <span className="text-[10px] origin-center">2R009</span>
              </button>

              <button className="relative h-[20px] w-full  border-2">
                <span className="text-[10px] origin-center">2R010</span>
              </button>
            </div>
          </div>

          <div className="flex flex-row w-4/5">
            <div className="w-5/12 flex flex-row">
              <button className="h-full w-[75px]  border-2">2R011</button>
              <button className="h-full flex-grow  border-2">2R012</button>
              <button className="h-full w-[75px] ml-auto  border-2">
                2R013
              </button>
            </div>
            <div className="w-7/12 bg-orange-400 flex flex-row">
              <button className="h-full w-5/12  border-2">2R014</button>
              <button className="h-full flex-grow  border-2">
                <span className="block transform -rotate-90 text-xs origin-center">
                  2R015
                </span>
              </button>
              <button className="h-full w-5/12 ml-auto  border-2">2R016</button>
            </div>
          </div>
        </div>

        <div className="flex flex-row h-[30px]">
          <button className="h-full  border-2">
            <span className="text-xs">2R006</span>
          </button>
          <button className="h-full w-[65px] ml-auto  border-2">
            <span className="text-xs">2R017</span>
          </button>
        </div>

        <div className="flex flex-row flex-grow">
          <div className="flex flex-col w-1/3">
            <div className="flex flex-row h-1/5">
              <button className="w-5/6  border-2">2R004</button>
              <button className="w-1/6  border-2">
                <span className="block transform -rotate-90 text-[10px] origin-center">
                  2R005
                </span>
              </button>
            </div>
            <div className="flex flex-row h-4/5 bg-black-200">
              <button className="w-1/3 h-1/4 ml-auto  border-2">2R003</button>
            </div>
          </div>

          <div className="flex flex-row w-2/3">
            <div className="flex flex-col ml-auto w-3/4">
              <div className="flex flex-row h-5/6">
                <div className="flex h-5/6 w-2/3">
                  <div className="flex flex-col w-2/3">
                    <div className="flex flex-row h-1/3 ">
                      <button className="w-1/2  border-2">2R024</button>
                      <button className="w-1/4  border-2">
                        <span className="block transform -rotate-90 text-xs origin-center">
                          2R025
                        </span>
                      </button>
                      <button className="w-1/4  border-2">
                        <span className="block transform -rotate-90 text-xs origin-center">
                          2R027
                        </span>
                      </button>
                    </div>

                    <div className="flex flex-row h-2/3">
                      <div className="flex flex-col w-1/2">
                        <div className="flex flex-row h-1/4">
                          <button className="w-3/4  border-2 border-r-[3.5px] border-b-[3.5px] text-xs">
                            2R023
                          </button>
                          <button className="w-1/4  border-t-2">L</button>
                        </div>
                        <div className="flex flex-grow">
                          <button className=" flex-grow border-l-2 border-b-2 text-sm">
                            L(2R022)
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col w-1/2">
                        <button className="h-1/2  border-r-2 border-t-2 border-b-2">
                          L
                        </button>
                        <div className="flex flex-row h-1/2">
                          <button className="w-1/2  border-2 border-l-4">
                            <span className="block transform -rotate-90 text-xs origin-center">
                              2R033
                            </span>
                          </button>
                          <button className="w-1/2  border-2">
                            <span className="block transform -rotate-90 text-xs origin-center">
                              2R032
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-1/3 ml-auto bg-blue-200">
                    <button className="h-2/5  border-2">2R028</button>
                    <button className="h-1/5  border-2">2R029</button>
                    <div className="h-2/5">
                      <button className="h-2/3 w-full  border-t-2 border-l-2 border-r-2 text-sm">
                        L(2R029)
                      </button>
                      <div className="flex flex-row h-1/3">
                        <button className="w-1/2  border-2 border-t-[3.5px] border-r-[3.5px] text-[8px]">
                          2R031
                        </button>
                        <button className="w-1/2  border-r-2 border-b-2">
                          L
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col ml-auto w-1/5 bg-black-200">
                  <button className="h-1/3  border-2">2R018</button>
                </div>
              </div>

              <div className="flex flex-row h-1/6">
                <button className="ml-auto w-1/2  border-2">2R019</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ThirdFloor = () => {
    return (

      <div className="bg-white-50 border border-gray-300 rounded-2xl h-full p-1.5 flex flex-col">
        <div className="h-90/100 flex flex-row">        
          <div className="w-10/100 flex flex-col">
            <div className="h-16/100 flex flex-row">
              <button
                key={"3R041"}
                onClick={() => handleButtonClick("3R041")}
                className={`w-1/2 rounded-md
                ${getButtonColorClass(colorMap["3R041"])}
                ${getActiveButtonClass(activeButton === "3R041", colorMap["3R041"])}
                `}
                disabled={getButtonDisabledState(colorMap["3R041"])}
              >
                <span className="block transform -rotate-90 text-sm origin-center">
                  3R041
                </span>
              </button>
              <div className="flex w-full h-4/5 bg-zinc-500 rounded-tl-lg rounded-bl-lg justify-normal items-center">
                <Image 
                  src={stairs} 
                  alt="Stair Icon"
                  className={`${iconStyle} p-1`}
                />
              </div>
            </div>
            <button
              key={"3R016"}
              onClick={() => handleButtonClick("3R016")}
              className={`h-12/100 rounded-md border-2
              ${getButtonColorClass(colorMap["3R016"])}
              ${getActiveButtonClass(activeButton === "3R016", colorMap["3R016"])}`}
              disabled={getButtonDisabledState(colorMap["3R016"])}
            >
              3R016
            </button>
            <button
              key={"3R014"}
              onClick={() => handleButtonClick("3R014")}
              className={`h-16/100 rounded-md 
              ${getButtonColorClass(colorMap["3R014"])}
              ${getActiveButtonClass(activeButton === "3R014", colorMap["3R014"])}`}
              disabled={getButtonDisabledState(colorMap["3R014"])}
            >
              3R014
            </button>
            <button
              key={"3R012"}
              onClick={() => handleButtonClick("3R012")}
              className={`h-22/100 rounded-md 
              ${getButtonColorClass(colorMap["3R012"])}
              ${getActiveButtonClass(activeButton === "3R012", colorMap["3R012"])}`}
              disabled={getButtonDisabledState(colorMap["3R012"])}
            >
              3R012
            </button>
            <button
              key={"3R010"}
              onClick={() => handleButtonClick("3R010")}
              className={`h-22/100 rounded-md 
              ${getButtonColorClass(colorMap["3R010"])}
              ${getActiveButtonClass(activeButton === "3R010", colorMap["3R010"])}`}
              disabled={getButtonDisabledState(colorMap["3R010"])}
            >
              3R010
            </button>
            <button
              key={"3R008"}
              onClick={() => handleButtonClick("3R008")}
              className={`h-12/100 rounded-md  
              ${getButtonColorClass(colorMap["3R008"])}
              ${getActiveButtonClass(activeButton === "3R008", colorMap["3R008"])}`}
              disabled={getButtonDisabledState(colorMap["3R008"])}
            >
              3R008
            </button>
          </div>

          <div className="w-90/100 flex flex-col">
            <div className="h-1/2 flex flex-row">
              <div className="w-4/5 flex flex-col">
                <div className="h-26/100 flex flex-row">
                  <div className="flex flex-auto w-23/100 bg-zinc-500 justify-center items-center rounded-tr-lg rounded-br-lg">
                    <Image
                      src={toilet}
                      alt="Toilet Icon"
                      className={`${iconStyle} p-1 `}
                    />
                  </div>
                  <button
                    key={"3R018"}
                    onClick={() => handleButtonClick("3R018")}
                    className={`w-11/100 rounded-md 
                    ${getButtonColorClass(colorMap["3R018"])}
                    ${getActiveButtonClass(activeButton === "3R018", colorMap["3R018"])}`}
                    disabled={getButtonDisabledState(colorMap["3R018"])}
                  >
                    <span className="block transform -rotate-90 text-sm origin-center">
                      3R018
                    </span>
                  </button>
                  <button
                    key={"3R020"}
                    onClick={() => handleButtonClick("3R020")}
                    className={`w-13/100 rounded-md 
                    ${getButtonColorClass(colorMap["3R020"])}
                    ${getActiveButtonClass(activeButton === "3R020", colorMap["3R020"])}`}
                    disabled={getButtonDisabledState(colorMap["3R020"])}
                  >
                    3R020
                  </button>
                  <button
                    key={"3R022"}
                    onClick={() => handleButtonClick("3R022")}
                    className={`w-18/100 rounded-md 
                    ${getButtonColorClass(colorMap["3R022"])}
                    ${getActiveButtonClass(activeButton === "3R022", colorMap["3R022"])}`}
                    disabled={getButtonDisabledState(colorMap["3R022"])}
                  >
                    3R022
                  </button>
                  <button
                    key={"3R024"}
                    onClick={() => handleButtonClick("3R024")}
                    className={`w-18/100 rounded-md 
                    ${getButtonColorClass(colorMap["3R024"])}
                    ${getActiveButtonClass(activeButton === "3R024", colorMap["3R024"])}`}
                    disabled={getButtonDisabledState(colorMap["3R024"])}
                  >
                    3R024
                  </button>
                  <button
                    key={"3R025"}
                    onClick={() => handleButtonClick("3R025")}
                    className={`w-17/100 rounded-md 
                    ${getButtonColorClass(colorMap["3R025"])}
                    ${getActiveButtonClass(activeButton === "3R025", colorMap["3R025"])}`}
                    disabled={getButtonDisabledState(colorMap["3R025"])}
                  >
                    3R025
                  </button>
                </div>

                <div className="h-6/100"></div>

                <div className="h-68/100 flex flex-row">
                  <div className="w-4/100"></div>

                  <div className="w-32/100 flex flex-col">
                    <div className="h-51/100 flex flex-row">
                      <button
                        key={"3R017"}
                        onClick={() => handleButtonClick("3R017")}
                        className={`w-1/2 rounded-md 
                      ${getButtonColorClass(colorMap["3R017"])}
                      ${getActiveButtonClass(activeButton === "3R017", colorMap["3R017"])}`}
                        disabled={getButtonDisabledState(colorMap["3R017"])}
                      >
                        3R017
                      </button>
                      <button
                        key={"3R019"}
                        onClick={() => handleButtonClick("3R019")}
                        className={`w-1/2 rounded-md 
                        ${getButtonColorClass(colorMap["3R019"])}
                        ${getActiveButtonClass(activeButton === "3R019", colorMap["3R019"])}
                      `}
                        disabled={getButtonDisabledState(colorMap["3R019"])}
                      >
                        3R019
                      </button>
                    </div>

                    <button
                      key={"3R015"}
                      onClick={() => handleButtonClick("3R015")}
                      className={`h-36/100 rounded-md 
                      ${getButtonColorClass(colorMap["3R015"])}
                      ${getActiveButtonClass(activeButton === "3R015", colorMap["3R015"])}`}
                      disabled={getButtonDisabledState(colorMap["3R015"])}
                    >
                      3R015
                    </button>

                    <div className="h-13/100"></div>
                  </div>

                  <div className="w-11/100"></div>

                  <div className="w-53/100 flex flex-row">
                    <button
                      key={"3R021"}
                      onClick={() => handleButtonClick("3R021")}
                      className={`w-33/100 h-1/2 rounded-md 
                      ${getButtonColorClass(colorMap["3R021"])}
                      ${getActiveButtonClass(activeButton === "3R021", colorMap["3R021"])}`}
                      disabled={getButtonDisabledState(colorMap["3R021"])}
                    >
                      3R021
                    </button>
                    <div className="w-58/100 flex flex-col">
                      <button
                        key={"3R023"}
                        onClick={() => handleButtonClick("3R023")}
                        className={`h-1/2 rounded-md 
                      ${getButtonColorClass(colorMap["3R023"])}
                      ${getActiveButtonClass(activeButton === "3R023", colorMap["3R023"])}`}
                        disabled={getButtonDisabledState(colorMap["3R023"])}
                      >
                        3R023
                      </button>
                      <div className="h-1/2 flex flex-row">
                        <button
                          key={"3R028"}
                          onClick={() => handleButtonClick("3R028")}
                          className={`w-1/2 rounded-md 
                        ${getButtonColorClass(colorMap["3R028"])}
                        ${getActiveButtonClass(activeButton === "3R028", colorMap["3R028"])}`}
                          disabled={getButtonDisabledState(colorMap["3R028"])}
                        >
                          3R028
                        </button>
                        <button
                          key={"3R027"}
                          onClick={() => handleButtonClick("3R027")}
                          className={`w-1/2 rounded-md 
                        ${getButtonColorClass(colorMap["3R027"])}
                        ${getActiveButtonClass(activeButton === "3R027", colorMap["3R027"])}`}
                          disabled={getButtonDisabledState(colorMap["3R027"])}
                        >
                          3R027
                        </button>
                      </div>
                    </div>
                    <div className="w-9/100"></div>
                  </div>
                </div>
              </div>

              <div className="w-1/5 flex flex-col">
                <div className="h-66/100 bg-black-50 rounded-md"></div>
                <button
                  key={"3R026"}
                  onClick={() => handleButtonClick("3R026")}
                  className={`h-34/100 mt-auto rounded-md 
                  ${getButtonColorClass(colorMap["3R026"])}
                  ${getActiveButtonClass(activeButton === "3R026", colorMap["3R026"])} `}
                  disabled={getButtonDisabledState(colorMap["3R026"])}
                >
                  3R026
                </button>
              </div>
            </div>

            <div className="h-1/2 flex flex-row">
              <div className="w-3/100"></div>

              <div className="w-13/100 flex flex-col">
                <button
                  key={"3R013"}
                  onClick={() => handleButtonClick("3R013")}
                  className={`h-47/100 rounded-md 
                  ${getButtonColorClass(colorMap["3R013"])}
                  ${getActiveButtonClass(activeButton === "3R013", colorMap["3R013"])}`}
                  disabled={getButtonDisabledState(colorMap["3R013"])}
                >
                  3R013
                </button>
                <button
                  key={"3R011"}
                  onClick={() => handleButtonClick("3R011")}
                  className={`h-24/100 rounded-md 
                  ${getButtonColorClass(colorMap["3R011"])}
                  ${getActiveButtonClass(activeButton === "3R011", colorMap["3R011"])}`}
                  disabled={getButtonDisabledState(colorMap["3R011"])}
                >
                  3R011
                </button>
                <button
                  key={"3R009"}
                  onClick={() => handleButtonClick("3R009")}
                  className={`h-24/100 rounded-md 
                  ${getButtonColorClass(colorMap["3R009"])}
                  ${getActiveButtonClass(activeButton === "3R009", colorMap["3R009"])}`}
                  disabled={getButtonDisabledState(colorMap["3R009"])}
                >
                  3R009
                </button>
                <div className="5/100"></div>
              </div>

              <div className="w-4/100"></div>

              <div className="w-80/100 flex flex-col">
                <div className="h-70/100 flex flex-row">
                  <div className="w-53/100 flex flex-row">
                    <div className="w-22/100 flex flex-col">
                      <button
                        key={"3R002"}
                        onClick={() => handleButtonClick("3R002")}
                        className={`h-1/3 text-xs rounded-md 
                        ${getButtonColorClass(colorMap["3R002"])}
                        ${getActiveButtonClass(activeButton === "3R002", colorMap["3R002"])}`}
                        disabled={getButtonDisabledState(colorMap["3R002"])}
                      >
                        3R002
                      </button>
                      <button
                        key={"3R003"}
                        onClick={() => handleButtonClick("3R003")}
                        className={`h-1/3 text-xs rounded-md 
                        ${getButtonColorClass(colorMap["3R003"])}
                        ${getActiveButtonClass(activeButton === "3R003", colorMap["3R003"])}`}
                        disabled={getButtonDisabledState(colorMap["3R003"])}
                      >
                        3R003
                      </button>
                      <button
                        key={"3R004"}
                        onClick={() => handleButtonClick("3R004")}
                        className={`h-1/3 text-xs rounded-md 
                        ${getButtonColorClass(colorMap["3R004"])}
                        ${getActiveButtonClass(activeButton === "3R004", colorMap["3R004"])}`}
                        disabled={getButtonDisabledState(colorMap["3R004"])}
                      >
                        3R004
                      </button>
                    </div>
                    <div className="w-51/100 flex flex-col mx-1 bg-white-50">
                      <div className="h-42/100 flex flex-row ">
                        <div className="w-19/100 bg-zinc-500 rounded-tl-md"></div>
                        <div className="w-46/100 bg-zinc-500"></div>
                        <div className="w-19/100 bg-zinc-500 rounded-tr-md "></div>
                        <div className="w-16/100 flex flex-col">
                          <div className="h-76/100"></div>
                          <div className="h-24/100 bg-zinc-500 rounded-tr-md"></div>
                        </div>
                      </div>
                      <div className=" flex h-56/100 bg-zinc-500 items-top justify-center rounded-bl-md rounded-br-md">
                        <Image
                          src={stairs}
                          alt="Stairs Icon"
                          className={`${iconStyle} p-1`}
                        />
                      </div>
                    </div>
                    <div className="w-27/100 flex flex-col">
                      <div className="h-1/3"></div>
                      <button
                        key={"3R032"}
                        onClick={() => handleButtonClick("3R032")}
                        className={`h-2/3 rounded-md text-sm 
                        ${getButtonColorClass(colorMap["3R032"])}
                        ${getActiveButtonClass(activeButton === "3R032", colorMap["3R032"])}`}
                        disabled={getButtonDisabledState(colorMap["3R032"])}
                      >
                        3R032
                      </button>
                    </div>
                  </div>

                  <div className="w-4/100"></div>

                  <div className="w-29/100 flex flex-col">
                    <div className="h-1/3"></div>
                    <div className="h-1/3 flex flex-row">
                      <button
                        key={"3R031"}
                        onClick={() => handleButtonClick("3R031")}
                        className={`w-36/100 rounded-md 
                        ${getButtonColorClass(colorMap["3R031"])}
                        ${getActiveButtonClass(activeButton === "3R031", colorMap["3R031"])}`}
                        disabled={getButtonDisabledState(colorMap["3R031"])}
                      >
                        <span className="block transform -rotate-90 text-sm origin-center">
                          3R031
                        </span>
                      </button>
                      <button
                        key={"3R030"}
                        onClick={() => {
                          handleButtonClick("3R030");
                        }}
                        className={`w-64/100 rounded-md
                        ${getButtonColorClass(colorMap["3R030"])}
                        ${getActiveButtonClass(activeButton === "3R030", colorMap["3R030"])}`}
                        disabled={getButtonDisabledState(colorMap["3R030"])}
                      >
                        3R030
                      </button>
                    </div>
                    <button
                      key={"3R033"}
                      onClick={() => {
                        handleButtonClick("3R033");
                      }}
                      className={`h-1/3 rounded-md 
                      ${getButtonColorClass(colorMap["3R033"])}
                      ${getActiveButtonClass(activeButton === "3R033", colorMap["3R033"])}`}
                      disabled={getButtonDisabledState(colorMap["3R033"])}
                    >
                      3R033
                    </button>
                  </div>

                  <div className="w-4/100"></div>

                  <div className="w-10/100 bg-zinc-500 flex flex-col items-center justify-between py-1">
                    <Image
                      src={stairs}
                      alt="Stair Icon"
                      className={`${iconStyle} p-1`}
                    />
                    <Image
                      src={toilet}
                      alt="Toilet Icon"
                      className={`${iconStyle} p-1`}
                    />
                    <Image
                      src={lift}
                      alt="LiftIcon"
                      className={`${iconStyle} p-1`}
                    />
                  </div>
                </div>

                <div className="h-25/100 flex flex-row">
                  <button
                    key={"3R005"}
                    onClick={() => {
                      handleButtonClick("3R005");
                    }}
                    className={`w-20/100 rounded-md 
                    ${getButtonColorClass(colorMap["3R005"])}
                    ${getActiveButtonClass(activeButton === "3R005", colorMap["3R005"])}`}
                    disabled={getButtonDisabledState(colorMap["3R005"])}
                  >
                    3R005
                  </button>
                  <div className="w-37/100"></div>
                  <button
                    key={"3R034"}
                    onClick={() => {
                      handleButtonClick("3R034");
                    }}
                    className={`w-29/100 rounded-md 
                    ${getButtonColorClass(colorMap["3R034"])}
                    ${getActiveButtonClass(activeButton === "3R034", colorMap["3R034"])}`}
                    disabled={getButtonDisabledState(colorMap["3R034"])}
                  >
                    3R034
                  </button>
                  <div className="w-14/100 flex flex-col">
                    <div className="h-28/100"></div>
                    <button
                      key={"3R035"}
                      onClick={() => {
                        handleButtonClick("3R035");
                      }}
                      className={`h-72/100 rounded-md 
                      ${getButtonColorClass(colorMap["3R035"])}
                      ${getActiveButtonClass(activeButton === "3R035", colorMap["3R035"])}`}
                      disabled={getButtonDisabledState(colorMap["3R035"])}
                    >
                      3R035
                    </button>
                  </div>
                </div>

                <div className="h-5/100"></div>
              </div>
            </div>          
          </div>
        </div>
        <div className="h-10/100 flex flex-row">
          <div className="w-13/100 bg-black-50 rounded-bl-lg"></div>
          <button
            key={"3R006"}
            onClick={() => {
              handleButtonClick("3R006");
            }}
            className={`w-11/100 rounded-md mx-1
            ${getButtonColorClass(colorMap["3R006"])}
            ${getActiveButtonClass(activeButton === "3R006", colorMap["3R006"])}`}
            disabled={getButtonDisabledState(colorMap["3R006"])}
          >
            3R006
          </button>
          <div className="w-76/100 bg-black-50 rounded-br-lg rounded-tr-lg"></div>
        </div>
      </div>

      
    );
  };

  const SecondLeftWing = ({ dataFromApi }: { dataFromApi: any }) => {
    return (
      <div className="bg-white border border-gray-300 rounded-2xl h-full p-1.5 flex flex-col">
        <div className="h-20/100 bg-black-100"></div>

        <div className="h-60/100 flex flex-col">
          <div className="h-40/100 w-98/100 flex flex-row">
            <div className="w-4/100 flex flex-col">
              <div className="h-73/100 bg-black-400 border-2"></div>
            </div>

            <button className="w-7/100 rounded-md">
              <span className="block transform -rotate-90 origin-center">
                2L011
              </span>
            </button>

            <button className="w-15/100 rounded-md">2L010</button>
            <button className="w-18/100 rounded-md">2L009</button>
            <button className="w-36/100 rounded-md">2L008</button>

            <div className="w-10/100 flex flex-col">
              <div className="h-46/100"></div>

              <div className="h-32/100 flex flex-row">
                <button className="w-1/3 rounded-md">
                  <span className="block transform -rotate-90 text-[8px] origin-center">
                    2L005
                  </span>
                </button>
                <button className="w-1/3 rounded-md">
                  <span className="block transform -rotate-90 text-[8px] origin-center">
                    2L006
                  </span>
                </button>
                <button className="w-1/3 rounded-md">
                  <span className="block transform -rotate-90 text-[8px] origin-center">
                    2L007
                  </span>
                </button>
              </div>

              <div className="h-22/100 flex flex-row">
                <button className="w-1/3 rounded-md text-xs">T1</button>
                <div className="w-1/3"></div>
                <button className="w-1/3 rounded-md text-xs">T2</button>
              </div>
            </div>

            <div className="w-10/100 flex flex-col">
              <div className="h-46/100"></div>
              <div className="h-54/100 flex flex-row">
                <button className="w-2/5 rounded-md">
                  <span className="block transform -rotate-90 text-xs origin-center">
                    2L007
                  </span>
                </button>
                <div className="w-3/5 flex">
                  <button
                    className="w-full h-full  border-b-2"
                    style={{ clipPath: "polygon(0 100%, 0 0, 100% 100%)" }}
                  ></button>
                </div>
              </div>
            </div>
          </div>

          <div className="h-10/100 w-98/100"></div>

          <div className="h-50/100 w-98/100 flex flex-row">
            <div className="w-5/100 flex flex-col">
              <div className="h-2/3 flex flex-row">
                <div className="w-2/3 flex flex-col">
                  <div className="h-20/100"></div>
                  <div className="h-30/100 bg-black-400 rounded-md"></div>
                  <div className="h-50/100 bg-black-400 rounded-md"></div>
                </div>
                <div className="w-1/3"></div>
              </div>
              <div className="h-1/3 bg-black-400 rounded-md"></div>
            </div>

            <div className="w-20/100 flex flex-col">
              <div className="h-62/100 flex flex-row">
                <div className="w-1/2 flex flex-col">
                  <button className="h-50/100 rounded-md">2L012</button>
                  <div className="h-30/100 flex flex-row">
                    <button className="w-1/2 rounded-md text-[8px]">
                      2L016
                    </button>
                    <button className="w-1/2 rounded-md text-[8px]">
                      2L015
                    </button>
                  </div>
                  <button className="h-20/100 rounded-md">L</button>
                </div>

                <div className="w-1/2 flex flex-col">
                  <div className="h-4/5 flex flex-row">
                    <button className="w-35/100 rounded-md">
                      <span className="block transform -rotate-90 text-xs origin-center">
                        2L014
                      </span>
                    </button>
                    <button className="w-65/100 rounded-md">
                      <span className="block transform -rotate-90 text-xs origin-center">
                        2L013
                      </span>
                    </button>
                  </div>
                  <button className="h-1/5 rounded-md">L</button>
                </div>
              </div>

              <div className="h-38/100 flex flex-row">
                <button className="w-1/2 rounded-md">2L017</button>
                <button className="w-1/2 rounded-md">2L018</button>
              </div>
            </div>

            <button className="w-15/100 rounded-md">2L019</button>

            <button className="w-10/100 rounded-md">2L020</button>

            <div className="w-40/100 flex flex-row">
              <button className="w-1/4 rounded-md">2L021</button>
              <button className="w-1/4 rounded-md">2L022</button>
              <button className="w-1/4 rounded-md">2L023</button>
              <button className="w-1/4 rounded-md">2L024</button>
            </div>

            <div className="w-10/100"></div>
          </div>
        </div>

        <div className="h-10/100"></div>
      </div>
    );
  };

  // return SecondFloor((dataFromApi = { dataFromApi }));
  return ThirdFloor();
  //return SecondLeftWing((dataFromApi = { dataFromApi }))
};

export default FloorPlan;
