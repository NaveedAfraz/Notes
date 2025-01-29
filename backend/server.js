const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDatabase = require("./mongoDB");
const app = express();
const path = require("path");
require("dotenv").config({ path: "../.env" });
app.use(
  cors({
    origin: "http://localhost:5173",
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
app.use("/auth", userRoutes);
app.use("/*", requireAuth);
app.use("/userNotes", userNotes);
app.use("/notesearch", searchnotesRoute);
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log("Server is running on port 3006");
});
