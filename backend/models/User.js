const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const validator = require('validator')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  /*Use same account for group
  user_group_account:{
    type: Boolean,
    required: false,
  },
  //Can we associate current account to group account (group email)
  active_associated:{
    type: Boolean,
    required: false,
  },*/
  //group emails associated to user account
  myGroups:{
    type: Array,
    required: false,
  },

}, {timestamps: true});



UserSchema.statics.signup = async function(email, password) {

    //Validating email and password
    if(!validator.isEmail(email)){
        throw Error("Credentials must be valid email")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Credentials must be valid")
    }

    const emailExists = await this.findOne({email});

    if(emailExists) {
        throw Error("Email already exists!")
    }

    //salt
    const salt = await bcrypt.genSalt(12) // Test123!zscdvbtervfbevscd
    //hashed password
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hashedPassword})
    return user
}

UserSchema.statics.login = async function(email, password) {

  //Validating email and password

  if(!email || !password) {
    throw Error('You must provide your credentials to login!')
  }

  if(!validator.isEmail(email)){
      throw Error("Credentials must be valid")
  }

  const user = await this.findOne({email});

  if(!user) {
      throw Error("Email dosn't exist!")
  }

  const correctPassword = await bcrypt.compare(password, user.password)
  if(!correctPassword) {
    throw Error('Incorrect Credentials')
  }

  return user
} 


module.exports = mongoose.model("User", UserSchema);