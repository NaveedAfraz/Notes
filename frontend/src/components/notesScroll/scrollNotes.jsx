import NoteCard from "@/pages/Note";
import { useState } from "react";

function NotesCarousel({ latestNotes }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [notesPerPAge, setNotesPerPage] = useState(3);
  const handleNext = () => {
    if (currentIndex + notesPerPAge < latestNotes.length) {
      setCurrentIndex(currentIndex);
      setNotesPerPage(notesPerPAge + 3);
    }
  };

  const handlePrev = () => {
    if (currentIndex - notesPerPAge >= 0) {
      setCurrentIndex(currentIndex);
      setNotesPerPage(notesPerPAge - 3);
    }
  };

  return (
    <div className="relative flex w-full items-center bg-amber-300 p-4">
      <button
        className="bg-gray-800 text-white p-2 rounded-full shadow-md mx-2 disabled:opacity-50 hidden sm:block"
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        ◀
      </button>

      <div className="flex justify-center items-center gap-4 sm:gap-8 lg:gap-11 py-2 overflow-hidden w-full">
        {latestNotes.slice(currentIndex, notesPerPAge).map((latestNote) => (
          <div key={latestNote._id} className="w-64 sm:w-72">
            <NoteCard note={latestNote} />
          </div>
        ))}
      </div>

      <button
        className="bg-gray-800 text-white p-2 rounded-full shadow-md mx-2 disabled:opacity-50 hidden sm:block"
        onClick={handleNext}
        disabled={currentIndex + notesPerPAge >= latestNotes.length}
      >
        ▶
      </button>
    </div>
  );
}

export default NotesCarousel;
