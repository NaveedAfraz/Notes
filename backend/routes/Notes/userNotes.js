const express = require("express");
const {
  addNoteForUser,
  getNotesForUser,
  deleteNote,
  EditNote,
} = require("../../controller/Notes/userNotes");
const router = express.Router();

router.post("/Notes", addNoteForUser);
router.get("/FetchNotes/:id", getNotesForUser);
router.delete("/DeleteNote/:id", deleteNote);
router.put("/EditNote/:id", EditNote);
module.exports = router;
