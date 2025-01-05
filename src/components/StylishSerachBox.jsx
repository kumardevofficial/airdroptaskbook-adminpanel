import React, { useState } from "react";

const StylishSearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log("Searching for:", searchQuery); // Replace with your search logic
  };

  return (
    <div className="flex items-center justify-center  mt-5 bg-green-200">
      <div className="relative w-full max-w-md my-3">
        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search..."
          className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        />
        {/* Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m-5.65 2.85a7 7 0 110-14 7 7 0 010 14z"
          />
        </svg>
      </div>
    </div>
  );
};

export default StylishSearchBox;
