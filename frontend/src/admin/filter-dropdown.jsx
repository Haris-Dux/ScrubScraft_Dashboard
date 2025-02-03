import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";


export function FilterDropdown({
  label,
  options,
  selected,
  onSelect,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-[#DEC344] border rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span className="text-gray-700">{label}</span>
        <IoChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-48 bg-white border rounded-lg shadow-lg">
          <div className="py-2">
            {options.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                  selected === option
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
