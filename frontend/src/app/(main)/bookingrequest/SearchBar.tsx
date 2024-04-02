// SearchBar.tsx

"use client";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value.trim())}
      placeholder="Search by Booking ID or Room..."
      className="w-1/2 ml-5 z-50 p-2 border border-black-100 rounded-md"
    />
  );
};

export default SearchBar;
