const Groups = require("../models/Groups");
const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Login the groups
const login = async (req, res) => {
  const { email, password, groups } = req.body;

  try {
    const groups = await Groups.login(email, password, groups);

    //Create the JWT
    const token = generateToken(groups._id);
    res.status(200).json({email: groups.email, token});
  } catch (error) {
    res.status(400).json(error.message);
  }
};


// Signup the groups
const signup = async (req, res) => {
  const { email, password } = req.body;
console.log(req.body)
  try {
    const groups = await Groups.signup(email, password);

    //Create the JWT
  //  const token = generateToken(groups._id);

    res.status(200).json(groups);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { login, signup };