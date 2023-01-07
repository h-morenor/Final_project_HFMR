const { response } = require("express");
const { default: mongoose } = require("mongoose");
const { findById } = require("../models/Group");
const Group = require("../models/Group");
const User = require("../models/User");

//Helper: Search for resource by it's id and return it back
const checkOwnership = async (groupId, userId) => {
    
    const response = await Group.findById(groupId)
    const data = await response.createdBy
    console.log(data)
    console.log(userId)

  try {
    // Check whether this resource belongs to the signed in user
    if (!data.equals(userId)) {
      throw new Error("You're not authorized to do this!");
    }else {
      return true;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};


/* Old code 
const getAndCheckOwnership = async (id, user_id) => {
  try {
    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found!" });
    }
    // Check whether this resource belongs to the signed in user
    if (!resource.createdBy.equals(user_id)) {
      throw new Error("You're not authorized to do this!");
    }
    return resource;
  } catch (error) {
    throw new Error(error.message);
  }
};
*/

//1. Create a group
const createGroup = async (req, res) => {
  const { title, category, venueLocation } = req.body;

  //add to a database
  try {
    const group = await Group.create({
      title,
      createdBy: req.user._id,
      category,
      venueLocation,
      subcribers: [req.user._id],
    });

    const user = await User.findById(req.user._id);
    user.myGroups.push({ id: group._id, owner: true });
    user.save();

    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
    res.status(400).json(error.message);
  }
};

//2. Display all groups
const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({}).sort({ createdAt: -1 }); //this looks correct now
    res.status(200).json(groups);
  } catch (error) {
    res.status(400).json(error);
  }
};

//////// PART 3

//Another 1

const anotherFind = async (groupId) =>{
  const group = await Group.findById(groupId)
  return group
}

//Another 2

const anotherFunction2 = async (groups, array, val) =>{
 
 //try{
  //val = [];
  const groupsArray = groups.map(async group => { 
     const groupId = group.id
        
    const response = await anotherFind(groupId)
//try{
    //console.log(response)
    //val.push(response)
    val = addArray(response, array)
    //array.push(response)
    //console.log(val)
    //return val
//}catch {(console.log("Error"))}
  })
  //try{
  console.log(val)
  /*groupsArray
   .then(res => {
       console.log(res)
       console.log("hi")
    })*/

  //}catch {(console.log("Error1"))}
console.log("hi")
  return (groupsArray)
}

//AQdd

const addArray = (response, array) =>{
  array.push(response)
  //array = [...array, response]
  return array
}

// Helper find groups

const findGroup = async (groups, res) => {
  const array = []
  const groupArray = await anotherFunction2(groups, array)
//try{
//console.log(groupArray)
//}catch {(console.log("Error"))}
//console.log(groupArray)

  /*
 .then(res => {
       console.log(res)
    })*/
 
 //try{console.log(groupsArray)}catch {(console.log("Error"))}


  //console.log(array)
    //const subgroup = findGroup(groups, array)
    
//return groupsArray

res.status(200).json(groupArray);
}
      
  

//3. Display user groups
const getMyGroups = async (req, res, response) => {
  
   const { _id } = req.user;
   //console.log(_id)
   const array =[]
  try {
    const user = await User.findById(_id);
    const groups = user.myGroups
    console.log(groups)
    
    //const groupsArray = await groups.map(group =>  Group.findById(group.id))
 //TEST
 array = await findGroup(groups, array)
 console.log(array)

res.status(200).json(array);

  }catch (error) {
    res.status(400).json(error);
  }

}
// try{
//    const groupsArray = groups.map(group => {
//      const groupId = group.id
//      const subgroup = findGroup(groupId, array)
     
      /* .then(result => {   
       // array.push(result)
       // console.log(result)
      })*/
      
      //console.log(subgroup)
      // subgroup.then(result => {array.push(result)})
//    }) 

    //console.log(result)
    //groupsArray.then(console.log(array))
    //groupsArray.then(result => console.log(result))
//    res.status(200).json(groupsArray);
 // } catch (error) {
 //   res.status(400).json(error);
 // }
//  };


//4.
//Get specific group by its ID

const getGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Group not found!" });
  }

  const group = await Group.findById(id);

  if (!group) {
    return res.status(404).json({ error: "Group not found!" });
  }

  res.status(200).json(group);
};

//Update group information

const updateGroup = async (req, res) => {
  const { id } = req.params;


  try {
    const resource = await checkOwnership(id, req.user._id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Group not found!" });
    }

    const group = await Group.findByIdAndUpdate({ _id: id }, { ...req.body });

    if (!group) {
        return res.status(404).json({ error: "Group not found!" });
    }

  res.status(200).json(group);
    } catch (error) {
    res.status(400).json({message: error.message});
  }

};



//Join group

const joinGroup = async (req, res) => {
  const { id } = req.params;

  
 // Check if the group with id exist
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Group not found!" });
  }

  try{
  // console.log("hola1 group id + user id")
  const response = await Group.findById({id}.id)
  const groupId = await response._id //group id
   
  const userId = req.user._id //user req id
  //console.log(datas) //get the mygroups from User
  
  // Check if the user is already in the group
 const reponse = await User.findById(userId)
 const datas = reponse.myGroups
 const existing = await datas.forEach(data => {
    if (data.id.equals(groupId)){
        throw res.status(404).json({ error: "Already in group" })
    } 
    });

    //Adding to groups

  const user = await User.findById(req.user._id);
  user.myGroups.push({ id: groupId, owner: false });
  user.save();

  const group = await Group.findById(groupId);
  group.followers.push({ id: userId, owner: false });
  group.save();

  res.status(200).json(group);

 }catch (error) {
    return res.status(400).json(error.message);
  }
};

//Exit group

const exitGroup = async (req, res) => {

const { id } = req.params;
 //console.log("hola 0")
 //console.log(id) //6394a1567bc1499fda059fd4
 //console.log({id}) //{ id: '6394a1567bc1499fda059fd4' }

  // Check if the group with id exist
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Group not found!" });
    }

try{
  // console.log("group id + user id")
  const response = await Group.findById({id}.id)
  const groupId = await response._id //group id new ObjectId("6394a1567bc1499fda059fd4")
  const userId = req.user._id //user req id
  
  //Check if user is the owner of the group
  if (userId.equals(response.createdBy)) {
    return res.status(404).json({ error: "You are the owner of the group!" });
    }

  
 //Check if user belong to/follows the group 
    const reponse = await User.findById(userId)
    const datas = reponse.myGroups
    let existinGroup = false
    const existing = await datas.forEach(data => {
    let dataId = data.id
 
    if (dataId.equals(groupId)){
       existinGroup = true;  
    }    
    });

    if (existinGroup === false){
        throw res.status(404).json({ error: "Not in group" }) 
    }


  //Removing from group 

  
  const user = await User.findById(req.user._id);
  user.myGroups.remove({ id: groupId, owner: false });
  user.save();

  const group = await Group.findById(groupId);
  group.followers.remove({ id: userId, owner: false });
  group.save();

  console.log("Removed from group")

  res.status(200).json(groupId);

  
  }catch (error) {
    return res.status(400).json(error.message);
  }


};



//Find user

const findOwnerDeletemyGroup = async (groupId, userId, user) => {
  user = await User.findById(userId)
  try {  
    user.myGroups.remove({ id: groupId, owner: true });
    user.save();
    console.log("Removed owner from group")
    return;
  } catch (error) {
   res.status(400).json({ error: true, message: error.message });
   
  }  
}

//Helper Find followers

const findUserDeleteFollower = async (followerId, groupId, user, res) => {
  user = await User.findById(followerId)
  try {
    // Check whether this resource belongs to the signed in user
    if (!user) {
      throw new Error("User not found");
    }  
    user.myGroups.remove({ id: groupId, owner: false });
    user.save();
    console.log("Removed users from group")
    return
  } catch (error) {
   res.status(400).json({ error: true, message: error.message });
  }  
}

//Delete group
const deleteGroup = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Group not found!" });
  }
  const response = await Group.findById(id)
  if (!response) {
    return res.status(404).json({ error: "Group not found!" });
  }

  try{

  const response = await Group.findById({id}.id)
  const groupId = await response._id //group id new ObjectId("6394a1567bc1499fda059fd4")
  const userId = req.user._id //user req id

  

  if (!response) {
    return res.status(404).json({ error: "Group not found!" });
  }

  //Check if user is the owner of the group
  if (!userId.equals(response.createdBy)) {
    return res.status(404).json({ error: "You are not the owner of the group!" });
    }

 // Remove the group from the owner group
  const userRemoveGroup = findOwnerDeletemyGroup(groupId, userId)

 //Find followers array from groupo to delete
  const group = await Group.findById(groupId);
  const followers = group.followers
  console.log(followers)

  const resp = await followers.forEach(follower => {
  try{
  console.log(follower.id)
  const user = findUserDeleteFollower(follower.id, groupId)
  }catch (error) {
    throw new Error(error.message);
  }
  })
  
   //Delete group
  const groupRemove = await Group.findByIdAndDelete(groupId);


  if (!groupRemove) {
    return res.status(404).json({ error: "Group not found!" });
  }

  console.log("Group removed")
  res.status(200).json(group);

} catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  createGroup,
  getGroups,
  getGroup,
  updateGroup,
  deleteGroup,
  joinGroup,
  getMyGroups,
  exitGroup,
};
