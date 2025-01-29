import React, { useEffect, useState } from "react";
import { MoreVertical, Clock, Tag, Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes, setNotes } from "../../store/userNotes/userNotes";
import NoteCard from "./Note";

const Notes = () => {
  // console.log(notes);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { userInfo, userDetails } = useSelector((state) => state.user);
  const [visibleNotes, setVisibleNotes] = useState([]);
  const [count, setCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { notes } = useSelector((state) => state.userNotes);
  useEffect(() => {
    if (userDetails.id) {
      dispatch(getNotes(userDetails.id)).then((res) => {
        console.log(res.payload.notes);
        if (res.payload.success) {
          dispatch(setNotes(res.payload.notes));
          setVisibleNotes(res.payload.notes.slice(0, 8));
          setHasMore(res.payload.notes.length > count);
        }
      });
    }
  }, [userDetails.id, dispatch]);
  // console.log(notes.length);

  const handleScroll = () => {
    console.log(loading);
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 &&
      !loading &&
      hasMore
    ) {
      // console.log("runningggg");
      setLoading(true);
      setTimeout(() => {
        setCount((prevCount) => prevCount + 8);
        setLoading(false);
      }, 2000);
    }
  };
  console.log(notes);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // if (notes.length <= count) {
    //   setLoading(false);
    //   console.log(count);
    //   console.log(notes.length);

    //   console.log("run");
    //   return;
    // }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    setVisibleNotes(notes.slice(0, count));
    setHasMore(notes.length > count);
    // console.log("run");
  }, [count, notes]);

  return (
    <>
      <div className="mt-8 mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Your Notes</h2>
        {notes && notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {visibleNotes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            No notes available. Create your first note!
          </p>
        )}
        {loading && (
          <div className="text-center mt-4 flex *:mx-auto m-11">
            <Loader></Loader>
          </div>
        )}
      </div>
    </>
  );
};

export default Notes;
