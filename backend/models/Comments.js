const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentsSchema = new Schema(
  {
    msgtUser_GroupPost: {
      type: Array,
      required: true,
    },
    /*messageTitle: {
      type: String,
      required: true,
    },*/
    message: {
      type: String,
      required: false,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    senderName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comments", CommentsSchema);
