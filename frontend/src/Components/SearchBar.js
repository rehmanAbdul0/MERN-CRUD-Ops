import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ placeholder = "Search...", value, onSearch }) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-10 pr-4 py-2 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
      />
    </div>
  );
};

export default SearchBar;