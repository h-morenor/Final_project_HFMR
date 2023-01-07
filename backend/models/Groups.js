const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const validator = require('validator')

const Schema = mongoose.Schema;

const GroupsSchema = new Schema({
    email: {
    type: String,
    required: true,
    unique: true,
    },
    password: {
        type: String,
        required: true,
    },
     //Use same account for groups and user
  user_groups_account:{
    type: Boolean,
    required: false,
  },
  //Can we associate current account to groups account (user email)
  active_associated:{
    type: Boolean,
    required: false,
  },
  //user emails associated to user account
  associated:{
    type: String,
    required: false,
  },
}, {timestamps: true});



GroupsSchema.statics.signup = async function(email, password) {

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
    const groups = await this.create({email, password: hashedPassword})
    return groups
}

groupsSchema.statics.login = async function(email, password) {

  //Validating email and password

  if(!email || !password) {
    throw Error('You must provide your credentials to login!')
  }

  if(!validator.isEmail(email)){
      throw Error("Credentials must be valid")
  }

  const groups = await this.findOne({email});

  if(!groups) {
      throw Error("Email dosn't exist!")
  }

  const correctPassword = await bcrypt.compare(password, groups.password)
  if(!correctPassword) {
    throw Error('Incorrect Credentials')
  }

  return groups
} 


module.exports = mongoose.model("Groups", GroupsSchema);