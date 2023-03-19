const { response } = require("express");
const { default: mongoose } = require("mongoose");
const { findById } = require("../models/Group");
const Group = require("../models/Group");
const User = require("../models/User");

const multer = require("multer");
const Comments = require("../models/Comments");
const Post = require("../models/Post");

//Helper: Search for resource by it's id and return it back
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

/* Old code 
const getAndCheckOwnership = async (id, user_id) => {
  try {
    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found!" });
    }
    // Check whether this resource belongs to the signed in user
    if (!resource.createdBy.equals(user_id)) {
      throw new Error("You're not authorized to do this!");
    }
    return resource;
  } catch (error) {
    throw new Error(error.message);
  }
};
*/

/*
 */

//1. Create a group ORIGINAL

/////////////
/*
const storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, "./uploads/");
},
filename: function (req, file, cb) {
cb(null, new Date().toISOString() + file.originalname);
},
});

const fileFilter = (req, file, cb) => {
  // only allow jpeg or png files
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({ storage, fileFilter });*/

////////////

/*

let Image = require('../models/Images');
router.post('/image-profile', upload.single('profileImg'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const image = new Image({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        profileImg: url + '/public/' + req.file.filename
    });
    image.save().then(result => {
        res.status(201).json({
            message: "Image registered successfully!",
           imageCreated: {
                _id: result._id,
                profileImg: result.profileImg
            }

*/

const createGroup = async (req, res, next) => {
  const {
    title,
    category,
    venueLocation,
    address,
    hashtag,
    description,
    followers,
    posts,
  } = req.body;

  const url = req.protocol + "://" + req.get("host");

  try {
    const group = await Group.create({
      picture: req.file.filename,
      title,
      createdBy: req.user._id,
      category,
      venueLocation,
      address,
      hashtag,
      description,
      followers,
      posts,
      subcribers: [req.user._id], //Hint: We can count this and get number of followers
    });

    group.followers.push(req.user._id);
    group.save();

    const user = await User.findById(req.user._id);
    user.myGroups.push(group._id);
    user.save();

    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
    res.status(400).json(error.message);
  }
};

/*
//1. Create a group ORIGINAL

const createGroup = async (req, res) => {
  const { title, category, venueLocation, address, hashtag, description  } = req.body;

  //add to a database
  try {
    const group = await Group.create({
      title,
      createdBy: req.user._id,
      category,
      venueLocation,
      address,
      hashtag,
      description,      
      subcribers: [req.user._id], //Hint: We can count this and get number of followers
    });

    group.followers.push(req.user._id);
    group.save();

    const user = await User.findById(req.user._id);
    user.myGroups.push(group._id);
    user.save();

    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
    res.status(400).json(error.message);
  }
};
*/

//2. Display all groups
const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({}).sort({ createdAt: -1 }); //this looks correct now
    res.status(200).json(groups);
  } catch (error) {
    res.status(400).json(error);
  }
};

//3. Display user groups

// Moe-Harold scribbles:
const getMyGroups2 = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);

    const user = await User.findById(userId);

    const arrayOfGroupIds = user.myGroups;
    console.log(arrayOfGroupIds);

    const groups = await Group.find(
      { _id: { $in: arrayOfGroupIds } },
      {
        _id: 1,
        title: 1,
        createdBy: 1,
        followers: 1,
        category: 1,
        hashtag: 1,
        description: 1,
        picture: 1,
      }
    );

    const processedGroups = groups.map((group) => {
      return { ...group._doc, followersCount: group.followers.length };
    });

    console.log(processedGroups);

    res.status(200).json(processedGroups);
  } catch (error) {
    console.log(error.message);
  }
};

//4.
//Get specific group by its ID

const getGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Group not found!" });
  }

  const group = await Group.findById(id);

  if (!group) {
    return res.status(404).json({ error: "Group not found!" });
  }

  res.status(200).json(group);
};

//5. Update group information

const updateGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const resource = await checkOwnership(id, req.user._id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Group not found!" });
    }

    //const group = await Group.findByIdAndUpdate({ _id: id }, { ...req.body });
    const group = await Group.findByIdAndUpdate({ _id: id }, { ...req.body });
    if (req.file) {
      group.picture = req.file.filename;
      group.save();
    }

    if (!group) {
      return res.status(404).json({ error: "Group not found!" });
    }

    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//6. Join group

const joinGroup = async (req, res) => {
  const { id } = req.params;

  // Check if the group with id exist
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Group not found!" });
  }

  try {
    // console.log("hola1 group id + user id")

    const group = await Group.findById(id);

    const userId = req.user._id; //user req id
    //console.log(datas) //get the mygroups from User

    // Check if the user is already in the group
    const user = await User.findById(userId);
    const followedGroups = user.myGroups;
    const existing = followedGroups.forEach((id) => {
      if (id.equals(group._id)) {
        throw res.status(404).json({ error: "Already in group" });
      }
    });

    //Adding to groups

    // const user = await User.findById(req.user._id);
    user.myGroups.push(group._id);
    user.save();

    // const group = await Group.findById(groupId);
    group.followers.push(userId);
    group.save();

    res.status(200).json(group);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

//7. Exit group

const exitGroup = async (req, res) => {
  const { id } = req.params;
  //console.log("hola 0")
  //console.log(id) //6394a1567bc1499fda059fd4
  //console.log({id}) //{ id: '6394a1567bc1499fda059fd4' }

  // Check if the group with id exist
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Group not found!" });
  }

  try {
    // console.log("group id + user id")
    const group = await Group.findById(id);
    const userId = req.user._id; //user req id

    //Check if user is the owner of the group
    if (userId.equals(group.createdBy)) {
      return res.status(404).json({ error: "You are the owner of the group!" });
    }

    //Check if user belong to/follows the group
    const user = await User.findById(userId);
    const userGroups = user.myGroups;
    let existinGroup = false;
    const existing = userGroups.forEach((groupId) => {
      if (groupId.equals(group._id)) {
        existinGroup = true;
      }
    });

    if (existinGroup === false) {
      throw res.status(404).json({ error: "Not in group" });
    }

    //Removing from group

    user.myGroups.remove(group._id);
    user.save();

    group.followers.remove(userId);
    group.save();

    console.log("Removed from group");

    res.status(200).json(group._id);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

//Find user

const findOwnerDeletemyGroup = async (groupId, userId, user) => {
  user = await User.findById(userId);
  try {
    user.myGroups.remove({ id: groupId, owner: true });
    user.save();
    console.log("Removed owner from group");
    return;
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

//Helper Find followers

const findUserDeleteFollower = async (followerId, groupId, user, res) => {
  user = await User.findById(followerId);
  try {
    // Check whether this resource belongs to the signed in user
    if (!user) {
      throw new Error("User not found");
    }
    user.myGroups.remove({ id: groupId, owner: false });
    user.save();
    console.log("Removed users from group");
    return;
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

//8. Delete group
const deleteGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Group not found!" });
  }
  const response = await Group.findById(id);
  if (!response) {
    return res.status(404).json({ error: "Group not found!" });
  }

  try {
    const response = await Group.findById({ id }.id);
    const groupId = await response._id; //group id new ObjectId("6394a1567bc1499fda059fd4")
    const userId = req.user._id; //user req id

    if (!response) {
      return res.status(404).json({ error: "Group not found!" });
    }

    //Check if user is the owner of the group
    if (!userId.equals(response.createdBy)) {
      return res
        .status(404)
        .json({ error: "You are not the owner of the group!" });
    }

    // Remove the group from the owner group
    const userRemoveGroup = findOwnerDeletemyGroup(groupId, userId);

    //Find followers array from groups to delete
    const group = await Group.findById(groupId);

    const followers = group.followers;

    const resp = await followers.forEach((follower) => {
      try {
        console.log("t3");
        console.log(follower);
        const user = findUserDeleteFollower(follower, groupId);
      } catch (error) {
        throw new Error(error.message);
      }
    });

    //Delete group
    const groupRemove = await Group.findByIdAndDelete(groupId);

    if (!groupRemove) {
      return res.status(404).json({ error: "Group not found!" });
    }

    console.log("Group removed");
    res.status(200).json(group);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

//9. New message
const newMessage = async (req, res) => {
  const { from, to, message } = req.body;
  try {
    const newMessage = await Messages.create({
      message: message,
      chatUsers: [from, to],
      sender: from,
    });

    console.log("New message");
    res.status(200).json(newMessage);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

//10. Get new message
const getMessage = async (req, res) => {
  try {
    const from = req.params.user1Id;
    const to = req.params.user2Id;

    const newMessage = await Messages.find({
      chatUsers: {
        $all: [from, to],
      },
    }).sort({ createdAt: -1 });

    const allMessage = newMessage.map((msg) => {
      return {
        myself: msg.sender.toString() === from,
        message: msg.message,
      };
    });

    console.log("All message");
    res.status(200).json(allMessage);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

//11. New post

const newPost = async (req, res) => {
  const { id } = req.params;

  const { post, postTitle, date, address } = req.body;
  try {
    const newPost = await Post.create({
      post: post,
      postUser_group: [req.user._id.toString(), id],

      postedBy: req.user._id.toString(),
      postTitle: postTitle,
      date: date,
      address: address,
    });

    const group = await Group.findById(id);
    const user = await User.findById(req.user._id);
    const newPostId = newPost._id;

    console.log("test1");
    console.log(group.posts);
    console.log(id);

    newPost.postedByName = user.name;
    newPost.postedToGroupName = group.title;
    newPost.postedByProfilePicture = req.user.profilePicture;
    const userIdString = user._id.toString();
    newPost.attending.push(userIdString);
    newPost.save();

    console.log(newPost);

    group.posts.push(newPost._id);
    group.save();

    console.log("test2");
    console.log(group.followers);

    const messagePeople = group.followers.map((follower) => {
      console.log("test3");
      console.log(follower.toString());
      sendMessages(follower.toString(), newPostId);
    });

    console.log("completed");

    console.log("New Post");
    res.status(200).json(newPost);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// Use find and update groups:
const sendMessages = async (groupId, newPostId) => {
  try {
    const followerUser = await User.findById(groupId);
    followerUser.messages.push(newPostId);
    followerUser.save();
  } catch {
    console.log("error");
  }
};

//11.b Edit post

const modifyPost = async (req, res) => {
  const { id } = req.params; //this is the post
  const userId = req.user._id.toString();
  console.log(id);
  try {
    //const resource = await checkOwnership(id, req.user._id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Post not found!" });
    }

    console.log(req.body);
    const post = await Post.findByIdAndUpdate({ _id: id }, { ...req.body });
    console.log("updated");

    if (!post) {
      return res.status(404).json({ error: "Post not found!" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//12. Get group posts

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const group = await Group.findById(id);
    const groupPosts = group.posts;
    console.log(groupPosts);

    const posts = await Post.find(
      { _id: { $in: groupPosts } },
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
        postedToGroupName: 1,
        postTitle: 1,
        postedByProfilePicture: 1,
        createdAt: 1,
        updatedAt: 1,
      }
    ).sort({ createdAt: -1 });

    const processedPosts = posts.map((post) => {
      return {
        ...post._doc,
        commentsCount: post.comments.length,
        likesCount: post.likes.length,
        attendingCount: post.attending.length,
      };
    });

    console.log("All posts");
    res.status(200).json(processedPosts);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

////// 12.a Get one post

const get1Post = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const post = await Post.findById(id);
    console.log(post);

    const processedPost = {
      ...post._doc,
      commentsCount: post.comments.length,
      likesCount: post.likes.length,
      attendingCount: post.attending.length,
    };

    console.log("Found posts");
    res.status(200).json(processedPost);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

//13. new comment

const newComment = async (req, res) => {
  const { id } = req.params; //this is the post

  const { from, to, message } = req.body;

  try {
    const newComment = await Comments.create({
      message: message,
      msgtUser_GroupPost: [req.user._id.toString(), id],
      sender: req.user._id.toString(),
      senderName: req.user.name,
    });

    const post = await Post.findById(id);
    const newCommentId = newComment._id.toString();
    post.comments.push(newCommentId);
    post.save();

    res.status(200).json(newComment);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

//15. Get Group Comments

const getGroupComments = async (req, res) => {
  const { id } = req.params; //this is the post

  try {
    const post = await Post.findById(id);
    const postComments = post.comments;
    console.log(postComments);

    const comments = await Comments.find(
      { _id: { $in: postComments } },
      {
        _id: 1,
        msgtUser_GroupPost: 1,
        message: 1,
        sender: 1,
        senderName: 1,
        timestamps: 1,
        createdAt: 1,
        updatedAt: 1,
      }
    );

    const processedPosts = comments.map((comment) => {
      return { ...comment._doc, commentsCount: post.comments.length };
    });

    console.log("All comments");
    res.status(200).json(processedPosts);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

//16. new like

const newlike = async (req, res) => {
  const { id } = req.params; //this is the post
  const userId = req.user._id.toString();

  console.log(id);
  console.log(userId);
  try {
    const post = await Post.findById(id);
    const postLikes = post.likes;

    let likedbyuser = false;

    const liked = postLikes.map((likedby) => {
      if (likedby === userId) {
        likedbyuser = true;
      }
    });
    if (likedbyuser === false) {
      post.likes.push(req.user._id);
      post.save();
    }
    const processedLikes = { likesCount: post.likes.length };
    res.status(200).json(processedLikes);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

//17. unlike

// Function

const unlike = async (req, res) => {
  const { id } = req.params; //this is the post
  const userId = req.user._id.toString();

  console.log(id);
  console.log(userId);

  try {
    const post = await Post.findById(id);
    const postLikes = post.likes;

    let likedbyuser = false;

    const liked = postLikes.map((likedby) => {
      if (likedby === userId) {
        likedbyuser = true;
      }
    });

    if (likedbyuser === true) {
      post.likes.remove(req.user._id);
      post.save();
    }

    const processedLikes = { likesCount: post.likes.length };

    ////

    res.status(200).json(processedLikes);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

//18. new attend

const newattend = async (req, res) => {
  const { id } = req.params; //this is the post
  const userId = req.user._id.toString();

  console.log(id);
  console.log(userId);

  try {
    const post = await Post.findById(id);
    const postAttending = post.attending;

    let attendingByUser = false;

    const attedee = postAttending.map((attendedBy) => {
      if (attendedBy === userId) {
        attendingByUser = true;
      }
    });

    if (attendingByUser === false) {
      post.attending.push(req.user._id);
      post.save();
    }

    console.log(post);

    const processedAttendees = { attendingCount: post.attending.length };

    res.status(200).json(processedAttendees);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

//19. unattend

// Function

const unattend = async (req, res) => {
  const { id } = req.params; //this is the post
  const userId = req.user._id.toString();

  console.log(id);
  console.log(userId);

  try {
    const post = await Post.findById(id);
    const postAttending = post.attending;

    let attendingByUser = false;

    const attedee = postAttending.map((attendedBy) => {
      if (attendedBy === userId) {
        attendingByUser = true;
      }
    });

    if (attendingByUser === true) {
      post.attending.remove(req.user._id);
      post.save();
    }

    const processedAttendees = { attendingCount: post.attending.length };

    res.status(200).json(processedAttendees);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  createGroup,
  getGroups,
  getGroup,
  updateGroup,
  deleteGroup,
  joinGroup,
  exitGroup,
  getMyGroups2, // This is new
  newMessage,
  getMessage,
  newPost,
  getPost,
  newComment,
  getGroupComments,
  newlike,
  unlike,
  newattend,
  unattend,
  get1Post,
  modifyPost,
};
