import React, { useState } from "react";

const InputWithButton = ({
  buttonText,
  onButtonClick,
}: {
  buttonText: string;
  onButtonClick: any;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    onButtonClick(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex flex-col items-start w-full">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="shadow-md appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-[100px]"
        placeholder="Enter address"
      />
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-auto"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default InputWithButton;
