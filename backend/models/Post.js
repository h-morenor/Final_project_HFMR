const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    postUser_group: {
      type: Array,
      required: true,
    },
    postedToGroupName: {
      type: String,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postedByName: {
      type: String,
    },
    postedByProfilePicture: {
      type: String,
    },
    postTitle: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    date: {},
    address: {
      type: String,
      required: false,
    },
    isEvent: {
      type: Boolean,
      required: false,
    },
    comments: [
      {
        type: Array,
        required: false,
      },
    ],

    likes: [
      {
        type: String,
      },
    ],

    //Added 22/02
    attending: [
      {
        type: String,
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
