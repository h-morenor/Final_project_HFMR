 const express = require("express");

let 
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4');
    

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
  
} = require("../controllers/Group");


const AuthMiddleware = require("../middlewares/Auth");

const router = express.Router();

const Group = require("../models/Group");

//////////////////
/////


/*var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))*/




//////////////
////////////////

router.use(AuthMiddleware);

// GET all groups user is owner
router.get("/groups", getGroups);

//Get my groups :
router.get("/mygroups", getMyGroups2);

// GET a single group by it's ID
router.get("/:id", getGroup);

/*
// POST Create a new group MODIFIED
router.post("/new", /*upload.single('profileImg'), createGroup);*/

// POST Create a new group
router.post("/new", createGroup);

// PATCH Update a group by it's id
router.patch("/:id", updateGroup);

// DELETE delete a group by it's ID
router.delete("/:id", deleteGroup);

//Join a group //TODO-Moe: Joining groups best practices
router.patch("/:id/join", joinGroup);

//Exit a group
router.patch("/:id/exit", exitGroup);

module.exports = router;
