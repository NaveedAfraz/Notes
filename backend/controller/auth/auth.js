const userAuth = require("../../models/userAuth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
// console.log("JWT Secret:", process.env.JWT_SECRET);

const createUser = async (req, res) => {
  const { userData } = req.body;
  console.log("userData", userData);
  const { name, email, password } = req.body.userData;
  console.log(userData.name, userData.email, userData.password);

  if (!userData) {
    // console.log(username, email, password);
    return res.status(404).json({ error: "All fields are required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userAuth({
      username: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    return res.status(404).json({ error: "All fields are required" });
  }

  try {
    const response = await userAuth.findOne({ email });
    console.log(response);
    if (!response) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, response.password);

    if (!isPasswordValid)
      return res.status(404).json({ error: "Invalid password" });
    const token = jwt.sign(
      {
        userId: response._id,
        email: response.email,
        username: response.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    //  console.log(token);

    // localStorage.setItem("token", token);
    res.cookie("authToken", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      sameSite: "strict", // Protects against CSRF attacks
      maxAge: 3600000, // 1 hour in milliseconds
      path: "/",
    });
    return res
      .status(200)
      .json({ success: true, message: "Login successful", data: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error logging in" });
  }
};

const logout = async (req, res) => {
  console.log("hlo");

  res.clearCookie("authToken", { httpOnly: true, secure: false });

  res.status(200).json({ message: "Logout successful" });
};
module.exports = { createUser, loginUser, logout };
