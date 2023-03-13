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

const router = express.Router();
const {
  login,
  signup,
  getUser,
  updateUser,
  getPost,
} = require("../controllers/User");

// 1. Login route
router.post("/login", login);

// 2. Signup route
router.post("/signup", signup);

//3 Get user
router.get("/:id", getUser);

// 6. Update user
router.patch("/:id", upload.single("picture"), updateUser);

// 7. Get msg user 22/02
router.get("/:id/msgs", getPost);

router.get("/image/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, `../public/${req.params.filename}`));
});

module.exports = router;
