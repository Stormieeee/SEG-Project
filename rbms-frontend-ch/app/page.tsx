import DateAndTime from "./components/DateAndTime";
import Description from "./components/Description";
import FloorPlan from "./components/FloorPlan";
import RoomSpecifics from "./components/RoomSpecifics";
import RoomStatusKey from "./components/RoomStatusKey";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Topbar />
        <div className="flex-grow flex">
          <div className="w-1/2 flex flex-col">
            <div className="h-1/3 p-1">
              <DateAndTime />
            </div>
            <div className="h-2/3 p-1">
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
      </div>
    </div>
  );
}
