import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Label } from "@/ui/label";
import { User } from "lucide-react";

const Dropdown = ({ label, onSelect, options, userDetails, selectedValue }) => {
  console.log(userDetails);

  return (
    <DropdownMenu>
      {userDetails ? (
        <>
          {/* Trigger to show user details */}
          <DropdownMenuTrigger className="p-2 w-10  hover:bg-gray-100 rounded-lg border border-gray-300 text-sm cursor-pointer">
            <User size={20} className="text-gray-600" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border mx-11 border-gray-300 rounded-lg shadow-lg">
            <DropdownMenuLabel className="text-sm font-semibold text-gray-700 p-2">
              User Details
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="border-t border-gray-300" />
            {userDetails.map((user, userIndex) => (
              <div
                key={userIndex}
                className="p-3 rounded-lg bg-gray-50 shadow-sm border border-gray-200 mb-2"
              >
                <Label className="text-xs text-gray-600">Username</Label>
                <p className="font-medium text-gray-800">{user.username}</p>
                <Label className="text-xs text-gray-600 mt-2">Email</Label>
                <p className="text-sm text-gray-800">{user.email}</p>
              </div>
            ))}
          </DropdownMenuContent>
        </>
      ) : (
        <>
          {/* Trigger to show options */}
          <DropdownMenuTrigger className="p-2 w-28 mx-3 hover:bg-gray-100 rounded-lg border border-gray-300 text-sm cursor-pointer">
            {selectedValue || label}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-gray-300 rounded-lg shadow-lg">
            <DropdownMenuLabel className="text-sm font-semibold text-gray-700 p-2">
              {label}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="border-t border-gray-300" />
            {/* Options */}
            {options.map((option, index) => (
              <DropdownMenuItem
                key={index}
                className="text-sm text-gray-700 hover:bg-gray-100 p-2 cursor-pointer"
                onClick={() => onSelect(option.value)}
              >
                {option.value}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </>
      )}
    </DropdownMenu>
  );
};

export default Dropdown;
