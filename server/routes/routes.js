const express = require("express");
const { createUser, userVerify } = require("../controllers/user.controller");
const router = express.Router();

router.post("/user", createUser);
router.get("/verify/:userId", userVerify);

module.exports = router;
