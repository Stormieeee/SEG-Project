import DatePickerComponent from "./DateAndTimeComponents/DatePickerComponent";
import TimePickerComponent from "./DateAndTimeComponents/TimePickerComponent";

const DateAndTime = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-2xl h-full p-5 flex-col">
      <div className="flex">
        <div>
          <h1 className="text-lg">Date and Time</h1>
        </div>
        <img
          src="../Components-icon/Datetime Logo.svg"
          className="ml-2 mt-1.5 w-4 h-4"
        />
      </div>

      <div className="flex-grow flex mt-5 p-2">
        <div className="w-1/3 flex flex-col">
          <label className="font-semibold">Date</label>
          <DatePickerComponent />
        </div>

        <div className="w-1/3 flex flex-col">
          <label className="font-semibold">Start Time</label>
          <TimePickerComponent />
        </div>

        <div className="w-1/3">
          <label className="font-semibold">End Time</label>
          <TimePickerComponent />
        </div>
      </div>
    </div>
  );
};

export default DateAndTime;
