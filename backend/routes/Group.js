const express = require("express");
const {
  createGroup,
  getGroups,
  getGroup,
  updateGroup,
  deleteGroup,
  joinGroup,
  getMyGroups,
  exitGroup,
} = require("../controllers/Group");

const AuthMiddleware = require("../middlewares/Auth")

const router = express.Router();

const Group = require("../models/Group");

router.use(AuthMiddleware)

// GET all groups user is owner
router.get("/groups", getGroups);

//Get my groups :
router.get("/user/mygroups", getMyGroups);

// GET a single group by it's ID
router.get("/:id", getGroup);

// POST Create a new group
router.post("/:id/new", createGroup);

// PATCH Update a group by it's id
router.patch("/:id", updateGroup);

// DELETE delete a group by it's ID
router.delete("/:id/delete", deleteGroup);

//Join a group
router.patch("/:id/join", joinGroup);

//Exit a group
router.patch("/:id/exit", exitGroup);



module.exports = router;
