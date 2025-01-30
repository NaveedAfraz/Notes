import NoteCard from "@/pages/Note";
import { useState } from "react";

function NotesCarousel({ latestNotes }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const notesPerPage = 3; // Show 3 notes by default

  const handleNext = () => {
    if (currentIndex + notesPerPage < latestNotes.length) {
      setCurrentIndex(currentIndex + notesPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - notesPerPage >= 0) {
      setCurrentIndex(currentIndex - notesPerPage);
    }
  };

  return (
    <div className="relative flex w-full items-center bg-amber-300 p-4">
      {/* Previous Button */}
      <button
        className="bg-gray-800 text-white p-2 rounded-full shadow-md mx-2 disabled:opacity-50 hidden sm:block"
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        ◀
      </button>

      {/* Notes Display */}
      <div className="flex justify-center items-center gap-4 sm:gap-8 lg:gap-11 py-2 overflow-hidden w-full">
        {latestNotes
          .slice(currentIndex, currentIndex + notesPerPage)
          .map((latestNote) => (
            <div key={latestNote._id} className="w-64 sm:w-72">
              <NoteCard note={latestNote} />
            </div>
          ))}
      </div>

      {/* Next Button */}
      <button
        className="bg-gray-800 text-white p-2 rounded-full shadow-md mx-2 disabled:opacity-50 hidden sm:block"
        onClick={handleNext}
        disabled={currentIndex + notesPerPage >= latestNotes.length}
      >
        ▶
      </button>
    </div>
  );
}

export default NotesCarousel;
