const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//1. Login the user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //Create the JWT
    const token = generateToken(user._id);
    const userId = user._id; //added
    const picUser = user.profilePicture;
    res.status(200).json({ email: user.email, userId, token, picUser }); //added UserId
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//2. Signup the user
const signup = async (req, res) => {
  const { email, password, name, age, description } = req.body;
  console.log(req.body);
  try {
    const user = await User.signup(email, password);

    // Create the JWT
    const token = generateToken(user._id);
    const userId = user._id; //added

    //Added name
    const emailHead = email.split("@")[0];
    user.profilePicture = "person-circle.svg";
    user.name = emailHead;
    user.age = 18;
    user.description = "";
    user.save();
    //

    const response = {
      email: user.email,
      id: userId,
      token: token,
      name: emailHead,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//3. Display user

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

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

/* const updateGroup = async (req, res) => {
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
};*/

//6. update user
const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(404).json({ error: "User not found!" });
    // }

    // const user = User.findById(id);

    const user = await User.findByIdAndUpdate({ _id: id }, { ...req.body });
    user.profilePicture = req.file.filename;
    user.save();

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//7. Get user's post

//7. Get group posts

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    const userMsgs = user.messages;
    console.log(userMsgs);

    const posts = await Post.find(
      { _id: { $in: userMsgs } },
      {
        _id: 1,
        post: 1,
        postedBy: 1,
        postUser_group: 1,
        postedByName: 1,
        date: 1,
        address: 1,
        comments: 1,
        likes: 1,
        attending: 1,
        postTitle: 1,
        postedToGroupName: 1,
      }
    );

    const processedPosts = posts.map((post) => {
      return {
        ...post._doc,
        commentsCount: post.comments.length,
        attendingCount: post.attending.length,
      };
    });

    console.log("All posts");
    res.status(200).json(processedPosts);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { login, signup, getUser, updateUser, getPost };
