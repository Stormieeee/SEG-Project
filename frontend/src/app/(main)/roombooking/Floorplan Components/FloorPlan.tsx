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

import React from "react";

const FloorPlan = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-2xl h-full p-1.5 flex flex-col">
      <div className="flex flex-row h-[130px]">
        <div className="flex flex-row w-1/5">
          <div className="flex flex-col w-1/3">
            <button className="relative h-[60px] w-full bg-primary-100 border-2 border-primary-300 rounded-[6px] hover:border-2 hover:bg-primary-200 hover:border-primary-400">
              <span className="block transform -rotate-90 text-xs origin-center">
                2R008
              </span>
            </button>

            <button className="relative h-[60px] w-full mt-auto bg-blue-400 border-4">
              <span className="block transform -rotate-90 text-xs origin-center">
                2R007
              </span>
            </button>
          </div>

          <div className="flex flex-col w-1/3 ml-auto">
            <button className="relative h-[40px] w-full mt-auto bg-blue-400 border-4">
              <span className="text-[10px] origin-center">2R009</span>
            </button>

            <button className="relative h-[20px] w-full bg-blue-400 border-4">
              <span className="text-[10px] origin-center">2R010</span>
            </button>
          </div>
        </div>

        <div className="flex flex-row w-4/5">
          <div className="w-5/12 flex flex-row">
            <button className="h-full w-[75px] bg-blue-400 border-4">
              2R011
            </button>
            <button className="h-full flex-grow bg-blue-400 border-4">
              2R012
            </button>
            <button className="h-full w-[75px] ml-auto bg-blue-400 border-4">
              2R013
            </button>
          </div>
          <div className="w-7/12 bg-orange-400 flex flex-row">
            <button className="h-full w-5/12 bg-blue-400 border-4">
              2R014
            </button>
            <button className="h-full flex-grow bg-blue-400 border-4">
              <span className="block transform -rotate-90 text-xs origin-center">
                2R015
              </span>
            </button>
            <button className="h-full w-5/12 ml-auto bg-blue-400 border-4">
              2R016
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row h-[30px]">
        <button className="h-full bg-blue-400 border-4">
          <span className="text-xs">2R006</span>
        </button>
        <button className="h-full w-[65px] ml-auto bg-blue-400 border-4">
          <span className="text-xs">2R017</span>
        </button>
      </div>

      <div className="flex flex-row flex-grow">
        <div className="flex flex-col w-1/3">
          <div className="flex flex-row h-1/5">
            <button className="w-5/6 bg-blue-400 border-4">2R004</button>
            <button className="w-1/6 bg-blue-400 border-4">
              <span className="block transform -rotate-90 text-[10px] origin-center">
                2R005
              </span>
            </button>
          </div>
          <div className="flex flex-row h-4/5 bg-black-200">
            <button className="w-1/3 h-1/4 ml-auto bg-blue-400 border-4">
              2R003
            </button>
          </div>
        </div>

        <div className="flex flex-row w-2/3">
          <div className="flex flex-col ml-auto w-3/4">
            <div className="flex flex-row h-5/6">
              <div className="flex h-5/6 w-2/3">
                <div className="flex flex-col w-2/3">
                  <div className="flex flex-row h-1/3 ">
                    <button className="w-1/2 bg-blue-400 border-4">
                      2R024
                    </button>
                    <button className="w-1/4 bg-blue-400 border-4">
                      <span className="block transform -rotate-90 text-xs origin-center">
                        2R025
                      </span>
                    </button>
                    <button className="w-1/4 bg-blue-400 border-4">
                      <span className="block transform -rotate-90 text-xs origin-center">
                        2R027
                      </span>
                    </button>
                  </div>

                  <div className="flex flex-row h-2/3">
                    <div className="flex flex-col w-1/2">
                      <div className="flex flex-row h-1/4">
                        <button className="w-3/4 bg-blue-400 border-4 text-xs">
                          2R023
                        </button>
                        <button className="w-1/4 bg-blue-400 border-t-4">
                          L
                        </button>
                      </div>
                      <div className="flex flex-grow">
                        <button className="bg-blue-400 flex-grow border-l-4 border-b-4 text-sm">
                          L(2R022)
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col w-1/2">
                      <button className="h-1/2 bg-blue-400 border-r-4 border-t-4 border-b-4">
                        L
                      </button>
                      <div className="flex flex-row h-1/2">
                        <button className="w-1/2 bg-blue-400 border-4">
                          <span className="block transform -rotate-90 text-xs origin-center">
                            2R033
                          </span>
                        </button>
                        <button className="w-1/2 bg-blue-400 border-4">
                          <span className="block transform -rotate-90 text-xs origin-center">
                            2R032
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-1/3 ml-auto bg-blue-200">
                  <button className="h-2/5 bg-blue-400 border-4">2R028</button>
                  <button className="h-1/5 bg-blue-400 border-4">2R029</button>
                  <div className="h-2/5">
                    <button className="h-2/3 w-full bg-blue-400 border-t-4 border-l-4 border-r-4 text-sm">
                      L(2R029)
                    </button>
                    <div className="flex flex-row h-1/3">
                      <button className="w-1/2 bg-blue-400 border-4 text-[8px]">
                        2R031
                      </button>
                      <button className="w-1/2 bg-blue-400 border-r-4 border-b-4">
                        L
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col ml-auto w-1/5 bg-black-200">
                <button className="h-1/3 bg-blue-400 border-4">2R018</button>
              </div>
            </div>

            <div className="flex flex-row h-1/6">
              <button className="ml-auto w-1/2 bg-blue-400 border-4">
                2R019
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlan;
