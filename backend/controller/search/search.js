const Note = require("../../models/userNotes");

const searchNotes = async (req, res) => {
  const { searchBy, userId, content } = req.body;
  console.log(searchBy);
  console.log(userId);
  console.log(content);

  if (!content) {
    return res.status(400).json({
      success: false,
      message: "Search term is required",
    });
  }

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    let searchData;
    const searchQuery = { userId }; // Base query to filter by user

    switch (searchBy) {
      case "All":
        searchQuery.$or = [
          { title: { $regex: content, $options: "i" } },
          { content: { $regex: content, $options: "i" } },
        ];
        break;

      case "By Title":
        searchQuery.title = { $regex: content, $options: "i" };
        break;

      case "By Content":
        searchQuery.content = { $regex: content, $options: "i" };
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid search type. Use 'all', 'title', or 'content'",
        });
    }

    searchData = await Note.find(searchQuery).sort({ createdAt: -1 }); // Sort by creation date, newest first

    if (searchData.length > 0) {
      return res.status(200).json({
        success: true,
        message: `Found ${searchData.length} matching notes`,
        data: searchData,
      });
    }

    return res.status(404).json({
      success: false,
      message: "No matching notes found",
    });
  } catch (error) {
    console.error("Search notes error:", error);
    return res.status(500).json({
      success: false,
      message: "Error searching notes",
      error: error.message,
    });
  }
};

module.exports = { searchNotes };
