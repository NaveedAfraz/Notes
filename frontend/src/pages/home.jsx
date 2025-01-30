import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createNote,
  EditNote,
  getNotes,
  setEditNote,
  setfetchLatestNote,
} from "../../store/userNotes/userNotes";
import { Button } from "@/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import NoteCard from "./Note";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Separator } from "@radix-ui/react-select";
import NotesCarousel from "@/components/notesScroll/scrollNotes";

const Home = () => {
  const { editNote, fetchLatestNote } = useSelector((state) => state.userNotes);
  const [content, setContent] = useState(editNote?.content);

  const [latestNotes, setLatestNotes] = useState(null);
  // console.log(editNote.content);
  const [title, setTitle] = useState(editNote?.title || "");

  const { userInfo, userDetails } = useSelector((state) => state.user);
  console.log(userInfo, userDetails.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  // const [fetchLatestNote, setfetchLatestNote] = useState(false);
  const { notes, error } = useSelector((state) => state.userNotes);
  console.log(error);

  const handleLeftScroll = () => {};
  const handleRightScroll = () => {};
  const scrollRef = useRef(null);
  const handleSave = () => {
    //localStorage.setItem("projectNotes", content);
    console.log(content);
    if (content == "") {
      return toast({
        title: "Note is unchanged",
        description: "Please add some new content",
        className: "bg-red-500 text-white ",
        duration: 3000,
      });
    }
    if (content.trim() != "") {
      if (editNote._id) {
        console.log("clicked");
        console.log(title);
        dispatch(
          EditNote({ id: editNote._id, title: title, content: content })
        ).then((res) => {
          if (res.payload.success) {
            toast({
              title: "Note updated successfully",
              description: "Your note has been updated",
              className: "bg-white border-gray-300 text-black",
              duration: 3000,
            });
            setTitle("");
            setContent("");
            dispatch(setfetchLatestNote(true));
          } else {
            toast({
              title: "Note update failed",
              description: error.message,
              className: "bg-white border-gray-300 text-black ",
            });
          }
        });
      } else {
        dispatch(
          createNote({ content: content, title: title, id: userDetails.id })
        ).then((res) => {
          if (res.payload.success) {
            setTitle("");
            setContent("");
            toast({
              title: "Note created successfully",
              description: "Your note has been created",
              className: "bg-white border-gray-300 text-black",
              duration: 3000,
            });
            dispatch(setfetchLatestNote(true));
          }
        });
        // dispatch(getNotes(userID)).then((res) => {
        //   console.log(res);
        //   // setNotes(res.payload)
        //   //  navigate("/notes");
        // });
      }
    }
  };

  useEffect(() => {
    if (userDetails.id) {
      dispatch(getNotes(userDetails.id)).then((res) => {
        console.log(res);
        if (res.payload.notes && res.payload.notes.length > 0) {
          const sortedNotes = [...res.payload.notes].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          dispatch(setfetchLatestNote(false));
          console.log(sortedNotes);
          setLatestNotes(sortedNotes);
        }
      });
    }
  }, [dispatch, fetchLatestNote]);

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title || "");
      setContent(editNote.content || "");
    }
  }, [editNote]);
  const handleCancel = () => {
    setTitle("");
    setContent("");
    dispatch(setEditNote({}));
  };
  console.log(latestNotes);

  return (
    <div>
      <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-3xl mt-8 mx-10">
        <h1 className="text-2xl font-bold mb-4">Project Notes</h1>
        <div className="border-none bg-white rounded-md mb-4">
          <Input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Note Title"
            className="w-full border-gray-300  px-2 py-2 border-b focus:outline-none"
          />
          {/* <EditorContent editor={editor} className="custom-editor " /> */}
          <Separator className="my-4 h-0.5 bg-gray-300 border-gray-300 " />

          <Textarea
            className="w-full border-none mt-4 h-32 border-gray-300  px-2 py-2 focus:outline-none"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="Note Content"
          />
        </div>
        <button
          onClick={handleSave}
          className=" bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          {editNote._id ? "Update" : "Save"}
        </button>
        {editNote._id && <Button onClick={handleCancel}>Cancel</Button>}
      </div>

      {notes && notes.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-2 mx-13 my-10">
            Latest Note
          </h2>
          {latestNotes && latestNotes.length > 0 && (
            <NotesCarousel latestNotes={latestNotes} />
          )}
        </>
      )}
      <Button
        onClick={() => navigate("/notes")}
        className="mt-4 mx-12 bg-gray-800 text-white px-4 py-2 rounded-lg"
      >
        Show All Notes
      </Button>
    </div>
  );
};
export default Home;
