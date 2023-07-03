import { useState, useEffect, useRef, useContext } from "react";
import Eth from "@svg/Eth";
import BNB from "@svg/BNB";
import Avax from "@svg/Avax";
import Matic from "@svg/Matic";

import { useNavigate } from "react-router-dom";
import { UserContext } from "@context/UserContext";

interface SidebarProps {
  options: any[];
  selectOption: (option: string) => void;
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  options,
  selectOption,
  isOpen,
  closeSidebar,
}) => {
  const node = useRef<any>();

  const handleClick = (e: MouseEvent) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    closeSidebar();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen]);

  return (
    <div
      ref={node}
      className={`fixed z-30 top-0 right-0 h-full w-64 bg-white p-4 shadow-lg transition-all duration-500 transform shadow-2xl ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {options.map((option: any, index) => (
        <button
          key={index}
          onClick={() => selectOption(option)}
          className="block w-full p-2 mb-2 border-2 rounded-lg border-black text-black"
        >
          {option.title}
        </button>
      ))}
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const selectStyle =
    "flex flex-row gap-3 items-center bg-white text-black px-3 py-1 font-bold rounded-lg ";
  const [options, setOptions] = useState([
    {
      title: (
        <div className={selectStyle}>
          <Eth />
          Ethereum
        </div>
      ),
      id: 1,
    },
    {
      title: (
        <div className={selectStyle}>
          <BNB />
          BNB
        </div>
      ),
      id: 56,
    },
    {
      title: (
        <div className={selectStyle}>
          <Matic />
          Polygon
        </div>
      ),
      id: 137,
    },
    {
      title: (
        <div className={selectStyle}>
          <Avax />
          Avax
        </div>
      ),
      id: 43114,
    },
  ]);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const { chain, setChain, id, setId } = useContext(UserContext);

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setChain(option.title);
    setId(option.id);
    setSidebarOpen(false);
  };

  return (
    <div className="h-16 bg-white flex items-center text-white font-kanit">
      <div className="ml-auto mr-10">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="border-2 rounded-lg shadow-2xl "
        >
          {selectedOption.title}
        </button>
      </div>
      <Sidebar
        options={options}
        selectOption={handleOptionSelect}
        isOpen={isSidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />
    </div>
  );
};

export default Header;
