import React, { useEffect, useRef, useState } from "react";
import { Search, Bell, Menu, X, Settings, User, LogOut } from "lucide-react";
import { Button } from "@/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { userOptions, Searchoptions } from "../../config/dropdown";
console.log(userOptions);

import {
  search,
  setError,
  setOverlayVisible,
} from "../../../store/search/searchSlice";
import { LogoutUser } from "../../../store/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { toast, useToast } from "@/hooks/use-toast";
import Dropdown from "../common/dropdown";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchBy, setSearchBy] = useState("All");
  console.log(searchBy);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const [filteredData, setfilteredData] = useState([]);
  const { userInfo, userDetails } = useSelector((state) => state.user);
  const handleSearch = (e) => {
    console.log("clicked");
    dispatch(setOverlayVisible(true));

    dispatch(
      search({ searchBy: searchBy, content: value, userId: userDetails.id })
    ).then((res) => {
      console.log(res);
      setValue("");
      if (res.payload.data.length > 0) {
        setfilteredData(res.payload.data);
      }
    });
  };
  console.log(userDetails);

  const { toast } = useToast();
  const { isOverlayVisible, error } = useSelector((state) => state.search);
  const inputRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        dispatch(setOverlayVisible(false));
        setfilteredData([]);
        console.log("running");
        dispatch(setError(null));
      }
    };
    console.log("running1");

    // Add event listener on component mount
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);
  console.log(error);
  useEffect(() => {
    if (isOverlayVisible) {
      document.body.style.overflow = "hidden"; // Disable scrolling

      return () => {
        document.body.style.overflow = "auto"; // Enable scrolling when unmounting
      };
    }
  }, [isOverlayVisible]);
  const naviagte = useNavigate();
  const handlelogot = () => {
    console.log("mdmd");

    dispatch(LogoutUser()).then((res) => {
      console.log(res);
      if (res.payload.message) {
        toast({
          title: "Logout Successfull",
          description: "You have been logged out successfully.",
          duration: 3000,
          className: "bg-white text-black border-none",
        });
        setTimeout(() => {
          naviagte("/login");
        }, 300);
      }
    });
  };
  // console.log(searchBy);

  return (
    <>
      {isOverlayVisible && (
        <div className="absolute top-17 w-full h-[99%] backdrop-blur bg-opacity-50 overflow-hidden"></div>
      )}
      <header className="bg-white border-b border-gray-200 fixed w-full top-0">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button> */}
            <h1
              className="text-xl font-bold mx-6 text-gray-800 cursor-pointer"
              onClick={() => naviagte("/home")}
            >
              Notes
            </h1>
          </div>
          <div className="hidden md:flex md:items-center md:flex-1 md:max-w-xl mx-4">
            <div className="relative w-full">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search notes..."
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => dispatch(setOverlayVisible(true))}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
              <Button
                className="absolute right-3 cursor-pointer z-50 text-gray-400"
                onClick={handleSearch}
              >
                Search
              </Button>
              <div className="absolute top-full left-0 w-full bg-white-400 border-none border-gray-300 z-20 rounded-lg shadow-lg mt-4">
                {filteredData.map((item) => (
                  <div
                    className="p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                    key={item.id}
                  >
                    <h1>{item.title}</h1>
                    <h3>{item.content}</h3>
                  </div>
                ))}
                {filteredData.length === 0 && error && (
                  <div className="p-2 border-gray-400 text-sm">{error}</div>
                )}
              </div>
            </div>

            <Dropdown
              label="Search By"
              selectedValue={searchBy}
              options={Searchoptions}
              onSelect={(option) => setSearchBy(option)}
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            <Button className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              {/* <Settings size={20} className="text-gray-600" /> */}
            </Button>
            {/* <Button className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"> */}
          
              <Dropdown
                // label={"Users"}
                options={userOptions}
                userDetails={[userDetails]}
              />
            {/* </Button> */}
            <LogOut onClick={handlelogot} className="cursor-pointer">
              <Button className="p-2 hover:bg-gray-100 rounded-lg">
                logout
              </Button>
            </LogOut>
          </div>
        </div>
        {/* Mobile Search Section */}{" "}
        <div className="md:hidden px-4 py-3 border-t border-gray-200">
          <div className="relative w-full">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search notes..."
              className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => dispatch(setOverlayVisible(true))}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
            <Button
              className="absolute right-3 px-2 py-1 text-sm"
              onClick={handleSearch}
            >
              Search
            </Button>

            {/* Dropdown results */}
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 z-20 rounded-lg shadow-lg mt-2">
              {filteredData.map((item) => (
                <div
                  className="p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                  key={item.id}
                >
                  <h1 className="text-sm font-medium">{item.title}</h1>
                  <h3 className="text-xs text-gray-600">{item.content}</h3>
                </div>
              ))}
              {filteredData.length === 0 && error && (
                <div className="p-2 text-gray-600 text-sm">{error}</div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
