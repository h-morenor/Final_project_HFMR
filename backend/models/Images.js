const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema  = new Schema({
  name: String,
  path: String
})
module.exports = mongoose.model('Picture', pictureSchema)


/* 07/02 Modif
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    profileImg: {
        type: String
    }
}, {
    collection: 'images'
})
module.exports = mongoose.model('Image', imageSchema)

*/