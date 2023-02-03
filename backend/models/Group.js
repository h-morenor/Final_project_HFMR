const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const GroupSchema = new Schema(
  {
   /* profileImg:
    {
        type: String,
        required: false,
    },*/
    title: {
      type: String,
      required: true,
    },
    //can be created by an user or a group
    createdBy: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    description: {
      type: String,
      required: false,
    },
    //a business can select up to 1000?
    max_people: {
      type: { type: Number, max: 1000 },
      required: false,
    },
    /*Joining fee. Maybe not in the first phase?
    cost: {
      type: Number,
      required: false,
    },*/
    category: { //TODO-Moe: convert to string
      type: Array,
      required: true,
    },
    hashtag: { //TODO-Moe: Change to tags?
      type: Array,
      required: false,
    },
    venueLocation: // TODO-Moe: Use string then string.slice('')
    {
        type: Array,
        required: false,
    },
    address: 
    {
        type: String,
        required: false,
    },
    admins: {
        type: Schema.Types.ObjectId, 
        ref: 'User'},
    followers: {
        type: Array,
    required: false,},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);
