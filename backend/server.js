const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDatabase = require("./mongoDB");
const app = express();
const path = require("path");
require("dotenv").config({ path: "../.env" });
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
app.use("/api/health", (req,res) => {
        return res.status(200).json({message: "working"})
})
app.use(
  "/assets",
  express.static(path.join(__dirname, "../frontend/dist/assets"))
);

// Serve the index.html file for all routes
const fs = require("fs");
app.get("/list-files", (req, res) => {
  const distPath = path.join(__dirname, "../frontend/dist");
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
// Modified regex to exclude reset-password route
app.use(/^(?!\/auth|\/assets|\/reset-password|\/$).*/, requireAuth);

app.use("/userNotes", userNotes);
app.use("/notesearch", searchnotesRoute);

app.get('/*', function(req, res) {
  // Don't serve index.html for API routes or asset requests
  if (req.url.startsWith('/api') || req.url.startsWith('/assets')) {
      return res.status(404).send('Not found');
  }
  
  try {
      res.sendFile(path.join(__dirname, '../frontend/dist/index.html'), function(err) {
          if (err) {
              console.error('Error sending index.html:', err);
              res.status(500).send('Error loading page');
          }
      });
  } catch (error) {
      console.error('Error in catch block:', error);
      res.status(500).send('Server error');
  }
});
console.log('Attempted path:', path.join(__dirname, '../frontend/dist/index.html'));
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log("Server is running on port 3006");
});
