import { useStateContext } from "./MyBookingContext";

const BookingSwitcher = () => {
  const { isCurrentFeedback, setIsCurrentFeedback, setSelectedRowIndex } =
    useStateContext();
  const switchBooking = () => {
    setIsCurrentFeedback(!isCurrentFeedback);
    setSelectedRowIndex(-1);
  };
  return (
    <div className="flex items-center justify-center">
      <button
        className={`px-4 py-2 rounded-xl rounded-r border text-xl
        ${isCurrentFeedback ? "bg-primary-50 text-primary-200" : "bg-primary-200/50 text-primary-500 hover:bg-primary-300/50"}`}
        onClick={switchBooking}
        disabled={isCurrentFeedback}
      >
        {"<"}
      </button>
      <div className="flex w-[11.25rem] py-2 justify-center text-lg font-medium border-y bg-white-50">
        {isCurrentFeedback ? "Current Feedback" : "Past Feedback"}
      </div>
      <button
        className={`px-4 py-2  rounded-xl rounded-l border text-xl
        ${!isCurrentFeedback ? "bg-primary-50 text-primary-200" : "bg-primary-200/50 text-primary-500 hover:bg-primary-300/50"}`}
        onClick={switchBooking}
        disabled={!isCurrentFeedback}
      >
        {">"}
      </button>
    </div>
  );
};

export default BookingSwitcher;