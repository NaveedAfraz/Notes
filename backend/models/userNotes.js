// const { collection } = require("./userAuth");
const mongoose = require("mongoose");

// Note Schema
const NoteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserAuth" },
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "userNotes",
  }
);

module.exports = mongoose.model("Note", NoteSchema);
