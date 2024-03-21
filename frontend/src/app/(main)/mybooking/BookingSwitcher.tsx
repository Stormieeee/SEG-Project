interface BookingSwitcherProps {
  isCurrentBooking: boolean;
  setIsCurrentBooking: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number>>;
}
const BookingSwitcher = ({
  isCurrentBooking,
  setIsCurrentBooking,
  setSelectedRowIndex,
}: BookingSwitcherProps) => {
  const switchBooking = () => {
    setIsCurrentBooking(!isCurrentBooking);
    setSelectedRowIndex(-1);
  };
  return (
    <div className="flex items-center justify-center">
      <button
        className={`px-4 py-2 bg-blue-500 rounded-xl rounded-r border text-xl
        ${isCurrentBooking ? "bg-primary-50 text-primary-200" : "bg-primary-100 text-primary-500"}`}
        onClick={switchBooking}
        disabled={isCurrentBooking}
      >
        {"<"}
      </button>
      <div className="flex w-[180px] py-2 justify-center text-xl border-y">
        {isCurrentBooking ? "Current Booking" : "Past Booking"}
      </div>
      <button
        className={`px-4 py-2 bg-blue-500 rounded-xl rounded-l border text-xl
        ${!isCurrentBooking ? "bg-primary-50 text-primary-200" : "bg-primary-100 text-primary-500"}`}
        onClick={switchBooking}
        disabled={!isCurrentBooking}
      >
        {">"}
      </button>
    </div>
  );
};

export default BookingSwitcher;
