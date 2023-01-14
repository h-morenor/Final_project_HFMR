const express = require("express");

const router = express.Router();
const {login, signup, getUsers} = require('../controllers/User')

// Login route
router.post("/login", login);

// Signup route
router.post("/signup", signup);

//Get users
//router.get("/users", getUsers)

module.exports = router;