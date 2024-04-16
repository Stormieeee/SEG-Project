import { useStateContext } from "./MyBookingContext";

const BookingSwitcher = () => {
  const { isCurrentBooking, setIsCurrentBooking, setSelectedRowIndex } =
    useStateContext();
  const switchBooking = () => {
    setIsCurrentBooking(!isCurrentBooking);
    setSelectedRowIndex(-1);
  };
  return (
    <div className="flex items-center justify-center">
      <button
        className={`px-4 py-2 rounded-xl rounded-r border text-xl
        ${isCurrentBooking ? "bg-primary-50 text-primary-200" : "bg-primary-200/50 text-primary-500"}`}
        onClick={switchBooking}
        disabled={isCurrentBooking}
      >
        {"<"}
      </button>
      <div className="flex w-[11.25rem] py-2 justify-center text-lg font-medium border-y bg-white-50">
        {isCurrentBooking ? "Current Booking" : "Past Booking"}
      </div>
      <button
        className={`px-4 py-2  rounded-xl rounded-l border text-xl
        ${!isCurrentBooking ? "bg-primary-50 text-primary-200" : "bg-primary-200/50 text-primary-500"}`}
        onClick={switchBooking}
        disabled={!isCurrentBooking}
      >
        {">"}
      </button>
    </div>
  );
};

export default BookingSwitcher;
