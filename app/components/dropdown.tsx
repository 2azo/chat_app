import React, { useState, useEffect } from "react";

const Dropdown = ({ buttonText, items, onSelect, reset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (item) => {
    if (item === "Abbrechen") {
      setSelectedItem(null);
      onSelect(null);
    } else {
      setSelectedItem(item);
      onSelect(item);
    }
    setIsOpen(false);
  };

 
  useEffect(() => {
    if (reset) {
      setSelectedItem(null);
    }
  }, [reset]);

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        type="button"
        className={`inline-flex px-6 py-3 justify-center w-full rounded-full border shadow-sm font-semibold focus:outline-none ${
          selectedItem ? "bg-orange-500 text-white" : "bg-white text-gray-700 border-gray-300"
        } hover:bg-orange-500 hover:text-white`}
      >
          {selectedItem || buttonText}
          <svg
            className={`ml-2 -mr-1 h-5 w-5 transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mb-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 bottom-full">
          <div className="py-1">
            {items.map((item, index) => (
              <div
                key={index}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export default Dropdown;
