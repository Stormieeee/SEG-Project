import React from "react";

const FloorPlan = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-2xl h-full p-1.5 flex flex-col">
      <div className="flex flex-row h-[130px]">
        <div className="flex flex-row w-1/5">
          <div className="flex flex-col w-1/3">
            <button className="relative h-[60px] w-full bg-blue-600">
              <span className="block transform -rotate-90 text-xs origin-center">
                2R008
              </span>
            </button>

            <button className="relative h-[60px] w-full mt-auto bg-blue-600">
              <span className="block transform -rotate-90 text-xs origin-center">
                2R007
              </span>
            </button>
          </div>

          <div className="flex flex-col w-1/3 ml-auto">
            <button className="relative h-[40px] w-full mt-auto bg-blue-600">
              <span className="text-[10px] origin-center">2R009</span>
            </button>

            <button className="relative h-[20px] w-full bg-yellow-600">
              <span className="text-[10px] origin-center">2R010</span>
            </button>
          </div>
        </div>

        <div className="w-5/12 bg-yellow-400">
          <button className="h-[130px] w-[50px] bg-red-400"></button>
          <button className="h-[130px] w-[50px] bg-purple-400"></button>
        </div>
        <div className="w-7/12 bg-orange-400"></div>
      </div>

      <div className="flex flex-row h-[30px] ">
        <button className=""></button>
      </div>
      <div className="flex flex-row h-[252px] ">
        {/* <button className="bg-blue-500 hover:bg-blue-700 w-[50px] h-[50px]"></button> */}
      </div>
    </div>
  );
};

export default FloorPlan;
