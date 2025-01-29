const express = require("express");
const router = express.Router();
const { searchNotes } = require("../../controller/search/search");

router.post("/search", searchNotes);

module.exports = router;