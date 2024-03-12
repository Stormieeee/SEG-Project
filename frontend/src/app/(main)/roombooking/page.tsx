import DateTime from "./Date and Time Components/DateAndTime";
import Description from "./DescriptionComponents/Description";
import FloorPlan from "./Floorplan Components/FloorPlan";
import RoomSpecifics from "./RoomSpecificsComponents/RoomSpecifics";
import RoomStatusKey from "./RoomSpecificsComponents/RoomStatusKey";

export default function RoomBooking() {
  return (
    <div className="flex">
      <div className="w-1/2 flex flex-col">
        <div className="h-1/3 p-1 mt-[10px] ml-[15px]">
          <DateTime />
        </div>
        <div className=" h-full p-1 mt-[10px] ml-[15px]">
          <RoomSpecifics />
        </div>
      </div>

      <div className="w-1/2 flex flex-col">
        <div className="h-4/6 p-1">
          <FloorPlan />
        </div>
        <div className="h-2/6 flex">
          <div className="w-7/12 p-1">
            <Description />
          </div>
          <div className="w-5/12 p-1">
            <RoomStatusKey />
          </div>
        </div>
      </div>
    </div>
  );
}