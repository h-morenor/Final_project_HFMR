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
    const userId= user._id //added
    res.status(200).json({ email: user.email, userId, token }); //added UserId
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
    const userId= user._id //added

    const response = {
      email: user.email,
      id: userId,
      token: token,
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
};


//3. Display all users
/*
const getUsers = async (followers, req, res) => {
  
  try {
    //const users = await User.find({})
    followers.forEach(follower=>{
      const email = User.findById(follower).email
      const userEmails = userEmails.push(email)
      return userEmails
    })

    res.status(200).json(userEmails);
  } catch (error) {
    res.status(400).json(error);
  }
};
*/

//5. Update group information

//Helper
const checkOwnership = async (groupId, userId) => {
  const response = await Group.findById(groupId);
  const data = await response.createdBy;
  console.log(data);
  console.log(userId);

  try {
    // Check whether this resource belongs to the signed in user
    if (!data.equals(userId)) {
      throw new Error("You're not authorized to do this!");
    } else {
      return true;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

//
const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const resource = await checkOwnership(id, req.user._id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Group not found!" });
    }

    const group = await Group.findByIdAndUpdate({ _id: id }, { ...req.body });

    if (!group) {
      return res.status(404).json({ error: "Group not found!" });
    }

    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = { login, signup };
