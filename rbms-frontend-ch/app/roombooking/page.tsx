import DateAndTime from "./components/DateAndTime";
import Description from "./components/Description";
import FloorPlan from "./components/FloorPlan";
import RoomSpecifics from "./components/RoomSpecifics";
import RoomStatusKey from "./components/RoomStatusKey";
import Sidebar from "../Sidebar"; // Moved to layout section
import Topbar from "../Topbar"; // Moved to layout section

export default function RoomBooking() {
  return (
    <div className="flex-grow flex">
      <div className="w-1/2 flex flex-col">
        <div className="h-1/3 p-2">
          <DateAndTime />
        </div>
        <div className="h-2/3 pl-2 pr-2 pb-2">
          <RoomSpecifics />
        </div>
      </div>

      <div className="w-1/2 flex flex-col">
        <div className="h-4/6 pt-2 pr-2">
          <FloorPlan />
        </div>
        <div className="h-2/6 flex">
          <div className="w-7/12 pt-2 pb-2 pr-2">
            <Description />
          </div>
          <div className="w-5/12 pt-2 pb-2 pr-2">
            <RoomStatusKey />
          </div>
        </div>
      </div>
    </div>
  );
}
