const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDatabase = require("./mongoDB");
const path = require("path");
const fs = require("fs");

require("dotenv").config({ path: "../.env" });

const app = express();


app.use(
  cors({
    origin: "https://notes-dt72.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.json());


connectToDatabase();


const userRoutes = require("./routes/auth/auth");
const userNotes = require("./routes/Notes/userNotes");
const requireAuth = require("./middleware/authCheck");
const searchnotesRoute = require("./routes/search/search");

// ✅ Serve static assets
app.use(express.static(path.join(__dirname, "frontend/dist")));
app.use("/assets", express.static(path.join(__dirname, "frontend/dist/assets")));

// Debug Route: List files in dist (for debugging only)
app.get("/list-files", (req, res) => {
  const distPath = path.join(__dirname, "frontend/dist");
  fs.readdir(distPath, (err, files) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ files });
  });
});


app.use("/auth", userRoutes);

app.get("/reAuth/verify", requireAuth, (req, res) => {
  console.log(req.user);
  res.status(200).json({
    message: "hlo",
    user: {
      id: req.user.id,
      email: req.user.email,
      username: req.user.username,
    },
  });
});


app.use(/^(?!\/auth|\/assets|\/$).*/, requireAuth);


app.use("/userNotes", userNotes);
app.use("/notesearch", searchnotesRoute);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

// Start Server
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
