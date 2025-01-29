const express = require("express");
const { createUser, loginUser, logout } = require("../../controller/auth/auth");

const router = express.Router();

router.post("/register", createUser);
router.post("/AuthUser", loginUser);
router.post("/logout", logout);

module.exports = router;
