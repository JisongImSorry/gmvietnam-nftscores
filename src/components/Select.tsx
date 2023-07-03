import React, { useState } from "react";

const Select = ({
  options,
  defaultValue,
  onChange,
}: {
  options: any;
  defaultValue: any;
  onChange: any;
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="relative inline-block w-full">
      <select
        value={selectedOption}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12l-6-6h12l-6 6z" />
        </svg>
      </div>
    </div>
  );
};

export default Select;
