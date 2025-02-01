const userAuth = require("../../models/userAuth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const sendEmail = require("../../helper/nodemailerFile");
const crypto = require("crypto");
const passwordReset = require("../../models/passwordReset");

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
      httpOnly: true,
      sameSite: "None", // 🔥 Fix: Allow cross-origin cookies
      secure: true, // Protects against CSRF attacks
      maxAge: 3600000,
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

  res.clearCookie("authToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  res.status(200).json({ message: "Logout successful" });
};

const ForgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  if (!email) {
    console.log("Email is required");
    return res.status(400).json({ error: "Email is required" });
  }
  try {
    const data = await userAuth.findOne({ email: email });

    const token = crypto.randomBytes(16).toString("hex");
    console.log(token);

    if (data) {
      console.log("Email is found");

      const savetoken = await passwordReset.create({
        userId: data._id,
        token: token,
      });
      const resetLink = `http://localhost:5173/reset-password?token=${token}`;
      sendEmail(email, resetLink);
      return res.status(200).json({ message: "Email sent successfully" });
    }

    return res.status(404).json({ error: "Email not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error resetting password" });
  }
};

const ResetPassword = async (req, res) => {
  const { token, password } = req.body;
  console.log(password);

  if (!password || !token) {
    console.log("Email is missing or token is missing");
    return res.status(400).json({ error: "Email is required" });
  }
  try {
    const resetEntry = await passwordReset
      .findOne({ token })
      .populate("userId");
    if (!resetEntry) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    const user = resetEntry.userId;
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error resetting password" });
  }
};
module.exports = {
  createUser,
  loginUser,
  logout,
  ResetPassword,
  ForgotPassword,
};
