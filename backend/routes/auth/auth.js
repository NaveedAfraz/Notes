const express = require("express");
const {
  createUser,
  loginUser,
  logout,
  ResetPassword,
  ForgotPassword,
} = require("../../controller/auth/auth");

const router = express.Router();

router.post("/register", createUser);
router.post("/AuthUser", loginUser);
router.post("/logout", logout);
router.post("/ForgotPassword", ForgotPassword);
router.post("/resetPassword", ResetPassword);
module.exports = router;
