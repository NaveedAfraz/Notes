const Note = require("../../models/userNotes"); // Adjust the path as necessary
const addNoteForUser = async (req, res) => {
  const { content, title, id } = req.body;
  // console.log(req.body);

  if (!id || !content || !title) {
    console.log("Incomplete data");
    return res
      .status(404)
      .json({ message: "userId, title, and content are required" });
  }
  //console.log(id);
  
  try {
    const newNote = new Note({
      userId: id,
      title: title,
      content,
    });

    await newNote.save();

    //  console.log("Note added:", newNote);
    res.status(201).json({
      message: "Note added successfully",
      success: true,
      note: newNote,
    });
  } catch (error) {
    console.error("Error adding note:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the note" });
  }
};

const getNotesForUser = async (req, res) => {
  const { id } = req.params;
  console.log("id is here of fwteching notes", id);
  if (!id) {
    console.log("Incomplete data");
    return res.status(404).json({ message: "userId is required" });
  }

  try {
    const notes = await Note.find({ userId: id });
  // console.log(notes);
    if (notes) {
      return res.status(200).json({
        success: true,
        message: "Notes retrieved successfully",
        notes,
      });
    }
    return res.status(404).json({ message: "No notes found for the user" });
  } catch (error) {
    console.error("Error getting notes:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while getting the notes" });
  }
};

const deleteNote = async (req, res) => {
  const id = req.params.id;
  console.log("id is this ", id);

  if (!id) {
    console.log("id is not there");
    return res.status(404).json({ message: "id is required" });
  }

  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    console.log(deletedNote);
    if (deletedNote) {
      return res.status(200).json({
        success: true,
        message: "Note deleted successfully",
      });
    }

    return res.status(404).json({ message: "Note not found" });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the note" });
  }
};

const EditNote = async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  // console.log("id is here eee ", id);
  // console.log("content s heufhb ", content);

  if (!id) {
    console.log("id is not there");
    return res.status(404).json({ message: "id is required" });
  }

  try {
    const updateNote = await Note.findByIdAndUpdate(id, { content });
    console.log("updatednot is ",updateNote);
    if (updateNote) {
      return res.status(200).json({
        success: true,
        message: "Note updated successfully",
      });
    }

    return res.status(404).json({ message: "Note not found" });
  } catch (error) {
    console.error("Error updating note:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the note" });
  }
};

module.exports = { addNoteForUser, getNotesForUser, EditNote, deleteNote };
