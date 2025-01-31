import NoteCard from "@/pages/Note";
import { Select } from "@radix-ui/react-select";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useEffect, useState } from "react";

function NotesCarousel({ latestNotes }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [notesPerPAge, setNotesPerPage] = useState(3);

  useEffect(() => {
    const updateNotesPerPage = () => {
      if (window.innerWidth < 740) {
        setNotesPerPage(1); // Mobile: Show 1 card at a time
      } else if (window.innerWidth < 1024) {
        setNotesPerPage(2); // Tablet: Show 2 cards
      } else {
        setNotesPerPage(3); // Desktop: Show 3 cards
      }
    };

    updateNotesPerPage();
    window.addEventListener("resize", updateNotesPerPage);

    return () => window.removeEventListener("resize", updateNotesPerPage);
  }, []);

  const handleNext = () => {
    if (notesPerPAge < latestNotes.length) {
      setCurrentIndex(currentIndex + 3);
      setNotesPerPage(notesPerPAge + 3);
    }
  };

  const handlePrev = () => {
    // console.log(notesPerPAge);
    // console.log(currentIndex - notesPerPAge);

    if (notesPerPAge - currentIndex >= 0) {
      console.log("prev");

      setCurrentIndex(currentIndex - 3);
      setNotesPerPage(notesPerPAge - 3);
    }
  };
  // console.log(notesPerPAge);
  // console.log(currentIndex);

  return (
    <div className="relative flex w-full items-center bg-gray-100 p-4">
      <button
        className="bg-gray-800 text-white p-2 rounded-full shadow-md mx-2 disabled:opacity-50 hidden sm:block"
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        <ArrowBigLeft />
      </button>

      <div className="flex justify-center items-center sm:gap-8 lg:gap-11 overflow-hidden w-full">
        {latestNotes.slice(currentIndex, notesPerPAge).map((latestNote) => (
          <div key={latestNote._id} className="w-64 sm:w-72">
            <NoteCard note={latestNote} />
          </div>
        ))}
      </div>

      <button
        className="bg-gray-800 text-white p-2 rounded-full shadow-md mx-2 disabled:opacity-50 hidden sm:block"
        onClick={handleNext}
        disabled={notesPerPAge >= latestNotes.length}
      >
        <ArrowBigRight></ArrowBigRight>
      </button>
    </div>
  );
}

export default NotesCarousel;
