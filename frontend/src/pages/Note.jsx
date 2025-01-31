import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { MoreVertical, Clock, Tag } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteNote,
  getNotes,
  setEditNote,
  setfetchLatestNote,
  setNotes,
} from "../../store/userNotes/userNotes";
import { useNavigate } from "react-router-dom";

const NoteCard = ({ note }) => {
  const dispatch = useDispatch();
  const { userInfo, userDetails } = useSelector((state) => state.user);

  const handleDeleteNote = () => {
    console.log("clicked");
    dispatch(deleteNote(note._id)).then((res) => {
      console.log(res);
      if (res.payload.success) {
        dispatch(getNotes(userDetails.id)).then((res) => {
          console.log(res);
          dispatch(setNotes(res.payload.notes));
          dispatch(setfetchLatestNote(true));
        });
      }
    });
  };
  const naviagte = useNavigate();
  const handleEditNote = (note) => {
    console.log(note);

    dispatch(setEditNote(note));
    // console.log(res);
    naviagte("/home");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="p-4 border-gray-300 h-52 min-w-80 rounded-lg shadow-md max-w-2xs mt-8 ">
          <div className="mb-1.5 flex *:flex-col justify-between items-center">
            <h2 className=" text-lg font-semibold  text-center">
              {note?.title}
            </h2>
            <DropdownMenu className="">
              <DropdownMenuTrigger asChild>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <MoreVertical size={20} className="text-gray-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="z-10  border-gray-300 h-auto w-24 bg-white rounded-lg shadow-md"
                align="end"
              >
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditNote(note);
                  }}
                  className="cursor-pointer"
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNote(note._id);
                  }}
                  className="cursor-pointer"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <CardContent className="p-0">
              <div className="text-gray-700 break-words line-clamp-4">
                {note?.content}
              </div>
              {/* <p className="text-sm text-gray-500 mt-2">
                Created: {new Date(note.createdAt).toLocaleDateString()}
              </p> */}
            </CardContent>
          </div>

          {/* Footer with actions */}
          <CardFooter className="flex justify-end gap-2 pt-4 mt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock size={16} />
              <span>{new Date(note?.createdAt).toLocaleDateString()}</span>
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>

      {/* Dialog remains the same */}
      <DialogContent className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{note?.title}</DialogTitle>
          <DialogDescription className="text-gray-700 mt-2">
            {note?.content}
          </DialogDescription>
          <p className="text-sm text-gray-500 mt-4">
            Created: {new Date(note?.createdAt).toLocaleDateString()}
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NoteCard;
