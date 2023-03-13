const express = require("express");
var path = require("path");
const uploadsDir = "public";

//////
/////

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "C:/Users/haroldm/Desktop/CLA/Final_project_HFMR/backend/public");
  },
  filename: (req, file, cb) => {
    //const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
////////
///////

const {
  createGroup,
  getGroups,
  getGroup,
  updateGroup,
  deleteGroup,
  joinGroup,
  getMyGroups,
  getMyGroups2,
  exitGroup,
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
} = require("../controllers/Group");

const AuthMiddleware = require("../middlewares/Auth");

const router = express.Router();

const Group = require("../models/Group");

router.use(AuthMiddleware);

// 1. POST Create a new group
router.post("/new", upload.single("picture"), createGroup);

// GET all groups user is owner
router.get("/groups", getGroups);

//Get my groups :
router.get("/mygroups", getMyGroups2);

// GET a single group by it's ID
router.get("/:id", getGroup);

/*
// POST Create a new group MODIFIED
router.post("/new", /*upload.single('profileImg'), createGroup);*/

// PATCH Update a group by it's id
router.patch("/:id", upload.single("picture"), updateGroup);

// DELETE delete a group by it's ID
router.delete("/:id", deleteGroup);

//Join a group //TODO-Moe: Joining groups best practices
router.patch("/:id/join", joinGroup);

//Exit a group
router.patch("/:id/exit", exitGroup);

//9. Create messages
router.post("/newmsg", newMessage);

//10. All messages
router.get("/allmsg/:user1Id/:user2Id", getMessage);

//11. New post
router.post("/:id/newpost", newPost);

//12. Get post
router.get("/:id/getpost", getPost);

//12.a Get post
router.get("/:id/get1post", get1Post);

//13. New comment
router.post("/:id/comment", newComment);

//15. Get posts messages/comments
router.get("/:id/getgroupcomments", getGroupComments);

//16. New like
router.post("/:id/like", newlike);

//17. Unlike
router.patch("/:id/unlike", unlike);

// //18. New attending
router.post("/:id/attend", newattend);

//19. Unattending
router.patch("/:id/unattend", unattend);

router.get("/image/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, `../public/${req.params.filename}`));
});

module.exports = router;
