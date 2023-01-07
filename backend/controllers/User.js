const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Login the user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //Create the JWT
    const token = generateToken(user._id);
    res.status(200).json({ email: user.email, token });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Signup the user
const signup = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.signup(email, password);

    // Create the JWT
    const token = generateToken(user._id);
    const response = {
      email: user.email,
      token: token,
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { login, signup };
