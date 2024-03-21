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

const SecondFloor = () => {
  return(
    <div className="bg-white border border-gray-300 rounded-2xl h-full p-1.5 flex flex-col">
      <div className="flex flex-row h-[130px]">
        <div className="flex flex-row w-1/5">
          <div className="flex flex-col w-1/3">
            <button className="relative h-[60px] w-full bg-blue-400 border-2">
              <span className="block transform -rotate-90 text-xs origin-center">
                2R008
              </span>
            </button>

            <button className="relative h-[60px] w-full mt-auto bg-blue-400 border-2">
              <span className="block transform -rotate-90 text-xs origin-center">
                2R007
              </span>
            </button>
          </div>

          <div className="flex flex-col w-1/3 ml-auto">
            <button className="relative h-[40px] w-full mt-auto bg-blue-400 border-2">
              <span className="text-[10px] origin-center">2R009</span>
            </button>

            <button className="relative h-[20px] w-full bg-blue-400 border-2">
              <span className="text-[10px] origin-center">2R010</span>
            </button>
          </div>
        </div>

        <div className="flex flex-row w-4/5">
          <div className="w-5/12 flex flex-row">
            <button className="h-full w-[75px] bg-blue-400 border-2">
              2R011
            </button>
            <button className="h-full flex-grow bg-blue-400 border-2">
              2R012
            </button>
            <button className="h-full w-[75px] ml-auto bg-blue-400 border-2">
              2R013
            </button>
          </div>
          <div className="w-7/12 bg-orange-400 flex flex-row">
            <button className="h-full w-5/12 bg-blue-400 border-2">
              2R014
            </button>
            <button className="h-full flex-grow bg-blue-400 border-2">
              <span className="block transform -rotate-90 text-xs origin-center">
                2R015
              </span>
            </button>
            <button className="h-full w-5/12 ml-auto bg-blue-400 border-2">
              2R016
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row h-[30px]">
        <button className="h-full bg-blue-400 border-2">
          <span className="text-xs">2R006</span>
        </button>
        <button className="h-full w-[65px] ml-auto bg-blue-400 border-2">
          <span className="text-xs">2R017</span>
        </button>
      </div>

      <div className="flex flex-row flex-grow">
        <div className="flex flex-col w-1/3">
          <div className="flex flex-row h-1/5">
            <button className="w-5/6 bg-blue-400 border-2">2R004</button>
            <button className="w-1/6 bg-blue-400 border-2">
              <span className="block transform -rotate-90 text-[10px] origin-center">
                2R005
              </span>
            </button>
          </div>
          <div className="flex flex-row h-4/5 bg-black-200">
            <button className="w-1/3 h-1/4 ml-auto bg-blue-400 border-2">
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
                    <button className="w-1/2 bg-blue-400 border-2">
                      2R024
                    </button>
                    <button className="w-1/4 bg-blue-400 border-2">
                      <span className="block transform -rotate-90 text-xs origin-center">
                        2R025
                      </span>
                    </button>
                    <button className="w-1/4 bg-blue-400 border-2">
                      <span className="block transform -rotate-90 text-xs origin-center">
                        2R027
                      </span>
                    </button>
                  </div>

                  <div className="flex flex-row h-2/3">
                    <div className="flex flex-col w-1/2">
                      <div className="flex flex-row h-1/4">
                        <button className="w-3/4 bg-blue-400 border-2 border-r-[3.5px] border-b-[3.5px] text-xs">
                          2R023
                        </button>
                        <button className="w-1/4 bg-blue-400 border-t-2">
                          L
                        </button>
                      </div>
                      <div className="flex flex-grow">
                        <button className="bg-blue-400 flex-grow border-l-2 border-b-2 text-sm">
                          L(2R022)
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col w-1/2">
                      <button className="h-1/2 bg-blue-400 border-r-2 border-t-2 border-b-2">
                        L
                      </button>
                      <div className="flex flex-row h-1/2">
                        <button className="w-1/2 bg-blue-400 border-2 border-l-4">
                          <span className="block transform -rotate-90 text-xs origin-center">
                            2R033
                          </span>
                        </button>
                        <button className="w-1/2 bg-blue-400 border-2">
                          <span className="block transform -rotate-90 text-xs origin-center">
                            2R032
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-1/3 ml-auto bg-blue-200">
                  <button className="h-2/5 bg-blue-400 border-2">2R028</button>
                  <button className="h-1/5 bg-blue-400 border-2">2R029</button>
                  <div className="h-2/5">
                    <button className="h-2/3 w-full bg-blue-400 border-t-2 border-l-2 border-r-2 text-sm">
                      L(2R029)
                    </button>
                    <div className="flex flex-row h-1/3">
                      <button className="w-1/2 bg-blue-400 border-2 border-t-[3.5px] border-r-[3.5px] text-[8px]">
                        2R031
                      </button>
                      <button className="w-1/2 bg-blue-400 border-r-2 border-b-2">
                        L
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col ml-auto w-1/5 bg-black-200">
                <button className="h-1/3 bg-blue-400 border-2">2R018</button>
              </div>
            </div>

            <div className="flex flex-row h-1/6">
              <button className="ml-auto w-1/2 bg-blue-400 border-2">
                2R019
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ThirdFloor = () => {
  return(
    <div className="bg-white border border-gray-300 rounded-2xl h-full p-1.5 flex flex-row">

      <div className="w-10/100 flex flex-col">
        <div className="h-16/100 flex flex-row">
          <button className="w-1/2 bg-blue-400 border-2">
            <span className="block transform -rotate-90 text-sm origin-center">3R041</span>
          </button>
          <div className="w-1/2 h-2/3 bg-black-400 border-2"></div>
        </div>
        <button className="h-12/100 bg-blue-400 border-2">3R016</button>
        <button className="h-16/100 bg-blue-400 border-2">3R014</button>
        <button className="h-22/100 bg-blue-400 border-2">3R012</button>
        <button className="h-22/100 bg-blue-400 border-2">3R010</button>
        <button className="h-12/100 bg-blue-400 border-2">3R008</button>
      </div>

      <div className="w-90/100 flex flex-col">

        <div className="h-1/2 flex flex-row">

          <div className="w-4/5 flex flex-col">

            <div className="h-26/100 flex flex-row">
              <div className="w-23/100 bg-black-400 border-2"></div>
              <button className="w-11/100 bg-blue-400 border-2">
                <span className="block transform -rotate-90 text-sm origin-center">3R018</span>
              </button>
              <button className="w-13/100 bg-blue-400 border-2">3R020</button>
              <button className="w-18/100 bg-blue-400 border-2">3R022</button>
              <button className="w-18/100 bg-blue-400 border-2">3R024</button>
              <button className="w-17/100 bg-blue-400 border-2">3R025</button>
            </div>

            <div className="h-6/100"></div>

            <div className="h-68/100 flex flex-row">
              <div className="w-4/100"></div>

              <div className="w-32/100 flex flex-col">
                <div className="h-51/100 flex flex-row">
                  <button className="w-1/2 bg-blue-400 border-2">3R017</button>
                  <button className="w-1/2 bg-blue-400 border-2">3R019</button>
                </div>

                <button className="h-36/100 bg-blue-400 border-2">3R015</button>

                <div className="h-13/100"></div>
              </div>

              <div className="w-11/100"></div>

              <div className="w-53/100 flex flex-row">
                <button className="w-33/100 h-1/2 bg-blue-400 border-2">3R021</button>
                <div className="w-58/100 flex flex-col">
                  <button className="h-1/2 bg-blue-400 border-2">3R023</button>
                  <div className="h-1/2 flex flex-row">
                    <button className="w-1/2 bg-blue-400 border-2">3R028</button>
                    <button className="w-1/2 bg-blue-400 border-2">3R027</button>
                  </div>
                </div>
                <div className="w-9/100"></div>
              </div>
            </div>

          </div>

          <div className="w-1/5 flex flex-col">
            <div className="h-66/100 bg-black-400 border-2"></div>
            <button className="h-34/100 bg-blue-400 border-2 mt-auto">3R028</button>
          </div>

        </div>

        <div className="h-1/2 flex flex-row">

          <div className="w-3/100"></div>

          <div className="w-13/100 flex flex-col">
            <button className="h-47/100 bg-blue-400 border-2">3R013</button>
            <button className="h-24/100 bg-blue-400 border-2">3R011</button>
            <button className="h-24/100 bg-blue-400 border-2">3R009</button>
            <div className="5/100"></div>
          </div>

          <div className="w-4/100"></div>

          <div className="w-80/100 flex flex-col">

            <div className="h-70/100 flex flex-row">
              
              <div className="w-53/100 flex flex-row">
                <div className="w-22/100 flex flex-col">
                  <button className="h-1/3 bg-blue-400 border-2 text-sm">3R002</button>
                  <button className="h-1/3 bg-blue-400 border-2 text-sm">3R003</button>
                  <button className="h-1/3 bg-blue-400 border-2 text-sm">3R004</button>
                </div>
                <div className="w-51/100 flex flex-col">
                  <div className="h-42/100 flex flex-row">
                    <div className="w-19/100 bg-black-400"></div>
                    <div className="w-46/100 bg-black-200"></div>
                    <div className="w-19/100 bg-black-400"></div>
                    <div className="w-16/100 flex flex-col">
                      <div className="h-76/100"></div>
                      <div className="h-24/100 bg-black-400"></div>
                    </div>
                  </div>
                  <div className="h-56/100 bg-black-400"></div>
                </div>
                <div className="w-27/100 flex flex-col">
                  <div className="h-1/3"></div>
                  <button className="h-2/3 bg-blue-400 border-2">3R032</button>
                </div>
              </div>

              <div className="w-4/100"></div>
              
              <div className="w-29/100 flex flex-col">
                <div className="h-1/3"></div>
                <div className="h-1/3 flex flex-row">
                  <button className="w-36/100 bg-blue-400 border-2">
                    <span className="block transform -rotate-90 text-sm origin-center">3R031</span>
                  </button>
                  <button className="w-64/100 bg-blue-400 border-2">3R030</button>
                </div>
                <button className="h-1/3 bg-blue-400 border-2">3R033</button>
              </div>

              <div className="w-4/100"></div>

              <div className="w-10/100 bg-black-400"></div>
              
            </div>

            <div className="h-25/100 flex flex-row">
              <button className="w-20/100 bg-blue-400 border-2">3R005</button>
              <div className="w-37/100"></div>
              <button className="w-29/100 bg-blue-400 border-2">3R034</button>
              <div className="w-14/100 flex flex-col">
                <div className="h-28/100"></div>
                <button className="h-72/100 bg-blue-400 border-2">3R035</button>
              </div>
            </div>

            <div className="h-5/100"></div>

          </div>

        </div>

      </div>
    </div>
  )
}

const SecondLeftWing = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-2xl h-full p-1.5 flex flex-col">

      <div className="h-20/100 bg-black-50"></div>

      <div className="h-60/100 flex flex-col">
        
        <div className="h-40/100 w-98/100 flex flex-row">
          <div className="w-4/100 flex flex-col">
            <div className="h-73/100 bg-black-400 border-2"></div>
          </div>

          <button className="w-7/100 bg-blue-400 border-2">
            <span className="block transform -rotate-90 origin-center">2L011</span>
          </button>

          <button className="w-15/100 bg-blue-400 border-2">2L010</button>
          <button className="w-18/100 bg-blue-400 border-2">2L009</button>
          <button className="w-36/100 bg-blue-400 border-2">2L008</button>

          <div className="w-10/100 flex flex-col">

            <div className="h-46/100"></div>

            <div className="h-32/100 flex flex-row">
              <button className="w-1/3 bg-blue-400 border-2">
                <span className="block transform -rotate-90 text-[8px] origin-center">2L005</span>
              </button>
              <button className="w-1/3 bg-blue-400 border-2">
                <span className="block transform -rotate-90 text-[8px] origin-center">2L006</span>
              </button>
              <button className="w-1/3 bg-blue-400 border-2">
                <span className="block transform -rotate-90 text-[8px] origin-center">2L007</span>
              </button>
            </div>

            <div className="h-22/100 flex flex-row">
              <button className="w-1/3 bg-blue-400 border-2 text-xs">T1</button>
              <div className="w-1/3"></div>
              <button className="w-1/3 bg-blue-400 border-2 text-xs">T2</button>
            </div>

          </div>

          <div className="w-10/100 flex flex-col">
            <div className="h-46/100"></div>
            <div className="h-54/100 flex flex-row">
              <button className="w-2/5 bg-blue-400 border-l-2 border-b-2 border-t-2">
                <span className="block transform -rotate-90 text-xs origin-center">2L007</span>
              </button>
              <div className="w-3/5 flex">
                <button className="w-full h-full bg-blue-400 border-b-2" style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }}></button>
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
                <div className="h-30/100 bg-black-400 border-2"></div>
                <div className="h-50/100 bg-black-400 border-2"></div>
              </div>
              <div className="w-1/3"></div>
            </div>
            <div className="h-1/3 bg-black-400 border-2"></div>
          </div>

          <div className="w-20/100 flex flex-col">

            <div className="h-62/100 flex flex-row">

              <div className="w-1/2 flex flex-col">
                <button className="h-50/100 bg-blue-400 border-2">2L012</button>
                <div className="h-30/100 flex flex-row">
                  <button className="w-1/2 bg-blue-400 border-2 text-[8px]">2L016</button>
                  <button className="w-1/2 bg-blue-400 border-2 text-[8px]">2L015</button>
                </div>
                <button className="h-20/100 bg-blue-400 border-l-2 border-b-2">L</button>
              </div>

              <div className="w-1/2 flex flex-col">
                <div className="h-4/5 flex flex-row">
                  <button className="w-35/100 bg-blue-400 border-2">
                    <span className="block transform -rotate-90 text-xs origin-center">2L014</span>
                  </button>
                  <button className="w-65/100 bg-blue-400 border-t-2 border-l-2 border-r-2">
                    <span className="block transform -rotate-90 text-xs origin-center">2L013</span>
                  </button>
                </div>
                <button className="h-1/5 bg-blue-400 border-r-2 border-b-2">L</button>
              </div>

            </div>

            <div className="h-38/100 flex flex-row">
              <button className="w-1/2 bg-blue-400 border-2">2L017</button>
              <button className="w-1/2 bg-blue-400 border-2">2L018</button>
            </div>
          </div>

          <button className="w-15/100 bg-blue-400 border-2">2L019</button>

          <button className="w-10/100 bg-blue-400 border-2">2L020</button>

          <div className="w-40/100 flex flex-row">
            <button className="w-1/4 bg-blue-400 border-2">2L021</button>
            <button className="w-1/4 bg-blue-400 border-2">2L022</button>
            <button className="w-1/4 bg-blue-400 border-2">2L023</button>
            <button className="w-1/4 bg-blue-400 border-2">2L024</button>
          </div>

          <div className="w-10/100"></div>

        </div>
        
      </div>

      <div className="h-20/100 bg-black-50"></div>

    </div>
  )
}

const FloorPlan = () => {
  return (
    SecondFloor()
    // ThirdFloor()
    //SecondLeftWing()
  );
};

export default FloorPlan;
