import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useGoPlus } from "@hooks/useGoPlus";

import Eth from "@svg/Eth";
import BNB from "@svg/BNB";
import Avax from "@svg/Avax";
import Matic from "@svg/Matic";

import { useContext } from "react";
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

const Landing = () => {
  const navigate = useNavigate();
  const { getNftInfo } = useGoPlus();
  const [address, setAddress] = useState<string>("");
  const { chain, id, setChain, setId } = useContext(UserContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
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

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setChain(option.title);
    setId(option.id);
    setSidebarOpen(false);
  };

  return (
    <>
      <Sidebar
        options={options}
        selectOption={handleOptionSelect}
        isOpen={isSidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />
      <div className="w-full">
        <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
          <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
            <a href="/">
              <span className="flex items-center space-x-2 text-2xl font-medium text-green-500 dark:text-gray-100">
                <span></span>
                <span>NFTScores</span>
              </span>
            </a>
            <button
              aria-label="Toggle Menu"
              className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
              id="headlessui-disclosure-button-:r0:"
              type="button"
              aria-expanded="false"
              data-headlessui-state=""
            >
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
          <div className="hidden text-center lg:flex lg:items-center">
            <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
              <li className="mr-3 nav__item">
                <a
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                  href="/#Product"
                >
                  Product
                </a>
              </li>
              <li className="mr-3 nav__item">
                <a
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                  href="/#Features"
                >
                  Features
                </a>
              </li>
              <li className="mr-3 nav__item">
                <a
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                  href="/#FAQ"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="container p-8 mx-auto xl:px-0 flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
              NFT Analyzer for
              <br /> Crypto Users
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              NFT Scores is a free NFT analyzer tool for crypto users. <br />
              Don't get rugged anymore!
            </p>
            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a
                href="#try-it-now"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md "
              >
                Try Now
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <img
              alt="Hero Illustration"
              loading="eager"
              width="616"
              height="617"
              decoding="async"
              data-nimg="1"
              className="object-cover"
              src="/img/hero.png"
              style={{ color: "transparent" }}
            />
          </div>
        </div>
      </div>
      <div className="container p-8 mx-auto xl:px-0 ">
        <div className="flex flex-col justify-center">
          <div className="text-xl text-center text-gray-700 dark:text-white font-bold">
            Powered By
          </div>
          <div className="flex flex-wrap justify-center gap-5 mt-10 md:justify-around">
            <div className="pt-2 text-gray-400 dark:text-gray-400">
              <img src="https://cryptototem.com/wp-content/uploads/2023/01/GoPlus-Security-logo.jpg" />
            </div>
          </div>
        </div>
      </div>
      <div className="container p-8 mx-auto xl:px-0 flex w-full flex-col mt-4 items-center justify-center text-center">
        <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
          NFT Score Benefits
        </div>
        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
          Why NFT Score?
        </h2>
        <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          Don't get rugged anymore.
          <br />
          NFT Score is here to help you out. <br />
          Never forget to check the reliablity of NFT.
        </p>
      </div>
      <div className="container p-8 mx-auto xl:px-0 flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap ">
        <div className="flex items-center justify-center w-full lg:w-1/2 ">
          <div>
            <img
              alt="Benefits"
              loading="lazy"
              width="521"
              height="548"
              decoding="async"
              data-nimg="1"
              className="object-cover"
              src="/img/benefit-one.png"
              style={{ color: "transparent" }}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center w-full lg:w-1/2 ">
          <div>
            <div className="flex flex-col w-full mt-4">
              <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
                Check everything about your NFT
              </h3>
              <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
                Just type in your NFT Address, and get the score of your NFT.
              </p>
            </div>
            <div className="w-full mt-5">
              <div className="flex items-start mt-8 space-x-3">
                <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-7 h-7 text-indigo-50"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                    Only address needed
                  </h4>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Just provide address, we'll do the rest.
                  </p>
                </div>
              </div>
              <div className="flex items-start mt-8 space-x-3">
                <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-7 h-7 text-indigo-50"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V12zm2.25-3a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0113.5 9zm3.75-1.5a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                    Reliable, secure data
                  </h4>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Powered by GoPlus, we provide the best data ever.
                  </p>
                </div>
              </div>
              <div className="flex items-start mt-8 space-x-3">
                <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-7 h-7 text-indigo-50"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                    Protect your assets
                  </h4>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Protect your crypto assets from frauds with just a click
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container p-8 mx-auto xl:px-0 flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap ">
        <div className="flex items-center justify-center w-full lg:w-1/2 lg:order-1">
          <div>
            <img
              alt="Benefits"
              loading="lazy"
              width="521"
              height="482"
              decoding="async"
              data-nimg="1"
              className="object-cover"
              src="/img/benefit-two.png"
              style={{ color: "transparent" }}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center w-full lg:w-1/2 ">
          <div>
            <div className="flex flex-col w-full mt-4">
              <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
                Analyze anything
              </h3>
              <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
                Analyze anything you want, we'll provide you the best data.
              </p>
            </div>
            <div className="w-full mt-5">
              <div className="flex items-start mt-8 space-x-3">
                <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-7 h-7 text-indigo-50"
                  >
                    <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                    Mobile Friendly
                  </h4>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Same experience on PC and Mobile
                  </p>
                </div>
              </div>
              <div className="flex items-start mt-8 space-x-3">
                <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-7 h-7 text-indigo-50"
                  >
                    <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                    Simple, Easy
                  </h4>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Just provide us an address.
                  </p>
                </div>
              </div>
              <div className="flex items-start mt-8 space-x-3">
                <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-7 h-7 text-indigo-50"
                  >
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                    Reliable &amp; Lots of data
                  </h4>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Powered by GoPlus API, we provide rich data about your NFT.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="try-it-now"></div>
      <div className="container p-8 mx-auto xl:px-0 flex w-full flex-col mt-4 items-center justify-center text-center">
        <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
          Try it now
        </div>
        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
          Check your NFT's reliability now
        </h2>
      </div>
      <div className="flex mx-auto flex-col">
        <div className="mx-auto my-3">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="border-2 rounded-lg shadow-2xl "
          >
            {selectedOption.title}
          </button>
        </div>
        <input
          className="w-96 h-12 border-2 border-gray-400 mx-auto shadow-md rounded-[1000px] px-5"
          value={address}
          onChange={(e: any) => {
            setAddress(e.target.value);
          }}
        />
        <button
          className="mt-10 bg-blue-600 text-white h-12 w-36 mx-auto rounded-lg font-bold border-2 border-blue-500 hover:bg-blue-500"
          onClick={() => {
            getNftInfo(id + "", address).then((res) => {
              if (res === null) {
                alert("Invalid address! Please try again.");
              } else navigate(`/nft/${address}`);
            });
          }}
        >
          Check Now
        </button>
      </div>
      <div className="container p-8 mx-auto xl:px-0 flex w-full flex-col mt-4 items-center justify-center text-center">
        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
          Have no address in mind?
        </h2>
        <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          <div>try these addresses</div>
          <div className="py-1">0xED5AF388653567Af2F388E6224dC7C4b3241C544</div>
          <div className="py-1">0x22c36BfdCef207F9c0CC941936eff94D4246d14A</div>
        </p>
      </div>
      <div className="container p-8 mx-auto xl:px-0 flex w-full flex-col mt-4 items-center justify-center text-center">
        <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
          NFT Score lovers
        </div>
        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
          Hear from our users!
        </h2>
      </div>
      <div className="container p-8 mx-auto xl:px-0 ">
        <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
          <div className="lg:col-span-2 xl:col-auto">
            <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
              <p className="text-2xl leading-normal ">
                NFT Scores is a great way to{" "}
                <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
                  measure how safe
                </mark>{" "}
                the NFT is
              </p>
              <div className="flex items-center mt-8 space-x-3">
                <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
                  <img
                    alt="Avatar"
                    loading="lazy"
                    width="40"
                    height="40"
                    decoding="async"
                    data-nimg="1"
                    src="/img/user1.jpg"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div>
                  <div className="text-lg font-medium">Kim haru</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    NFT Scores FAN
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
              <p className="text-2xl leading-normal ">
                I always check on{" "}
                <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
                  NFT Score
                </mark>{" "}
                before I mint an NFT. It's a great tool.
              </p>
              <div className="flex items-center mt-8 space-x-3">
                <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
                  <img
                    alt="Avatar"
                    loading="lazy"
                    width="40"
                    height="40"
                    decoding="async"
                    data-nimg="1"
                    src="/img/user2.jpg"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div>
                  <div className="text-lg font-medium">Dylan Jung</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Crypto Enthusiast
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
              <p className="text-2xl leading-normal ">
                This is an{" "}
                <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
                  awesome
                </mark>{" "}
                tool that helps me avoid financial frauds!
              </p>
              <div className="flex items-center mt-8 space-x-3">
                <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
                  <img
                    alt="Avatar"
                    loading="lazy"
                    width="40"
                    height="40"
                    decoding="async"
                    data-nimg="1"
                    src="/img/user3.jpg"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div>
                  <div className="text-lg font-medium">John Vane</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    NFT Collector
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container p-8 mx-auto xl:px-0 flex w-full flex-col mt-4 items-center justify-center text-center">
        <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
          FAQ
        </div>
        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          Answer your customers possible questions here, it will increase the
          conversion rate as well as support or chat requests.
        </p>
      </div>
      <div id="FAQ"></div>
      <div className="container p-8 mx-auto xl:px-0 !p-0">
        <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
          <div className="mb-5">
            <button
              className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200"
              id="headlessui-disclosure-button-:r2:"
              type="button"
              aria-expanded="false"
              data-headlessui-state=""
            >
              <span>What is NFT Scores?</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className=" w-5 h-5 text-indigo-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="mb-5">
            <button
              className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200"
              id="headlessui-disclosure-button-:r4:"
              type="button"
              aria-expanded="false"
              data-headlessui-state=""
            >
              <span>In what scales are the scores?</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className=" w-5 h-5 text-indigo-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="mb-5">
            <button
              className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200"
              id="headlessui-disclosure-button-:r6:"
              type="button"
              aria-expanded="false"
              data-headlessui-state=""
            >
              <span>How do you calculate the scores?</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className=" w-5 h-5 text-indigo-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="mb-5">
            <button
              className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200"
              id="headlessui-disclosure-button-:r8:"
              type="button"
              aria-expanded="false"
              data-headlessui-state=""
            >
              <span>Do you offer technical support? </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className=" w-5 h-5 text-indigo-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="container p-8 mx-auto xl:px-0 ">
          <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-trueGray-700 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div>
                <a
                  className="flex items-center space-x-2 text-2xl font-medium text-green-500 dark:text-gray-100"
                  href="/"
                >
                  <span>NFT Scores</span>
                </a>
              </div>
              <div className="max-w-md mt-4 text-gray-500 dark:text-gray-400">
                NFT Scores is a free tool for tracking NFTs on the Blockchain.
                <br />
                Avoid rugpulls and secure your crypto assets with just a click!
              </div>
              <div className="mt-5"></div>
            </div>
            <div>
              <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
                <a
                  className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700"
                  href="/#Product"
                >
                  Product
                </a>
                <a
                  className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700"
                  href="/#Features"
                >
                  Features
                </a>
                <a
                  className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700"
                  href="/#FAQ"
                >
                  FAQ
                </a>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0"></div>
            </div>
          </div>
          <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
            Copyright © 2023.
            <a href="/" target="_blank" rel="noopener">
              NFT Scores.
            </a>{" "}
          </div>
        </div>
        <a
          href="https://web3templates.com"
          target="_blank"
          rel="noopener"
          className="absolute flex px-3 py-1 space-x-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded shadow-sm place-items-center left-5 bottom-5 dark:bg-trueGray-900 dark:border-trueGray-700 dark:text-trueGray-300"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 30 30"
            fill="none"
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="30"
              height="29.5385"
              rx="2.76923"
              fill="#362F78"
            ></rect>
            <path
              d="M10.14 21.94H12.24L15.44 12.18L18.64 21.94H20.74L24.88 8H22.64L19.58 18.68L16.36 8.78H14.52L11.32 18.68L8.24 8H6L10.14 21.94Z"
              fill="#F7FAFC"
            ></path>
          </svg>
          <span>Web3Templates</span>
        </a>
      </div>
    </>
  );
};

export default Landing;
