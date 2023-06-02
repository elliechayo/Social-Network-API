// models
const User = require("../models/User");
const Thought = require("../models/Thought");

// fetch all users from db and return it
const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}).populate("friends");
    return res.json(allUsers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get a single user based on the id
const getSingleUser = async (req, res) => {
     try {
       const singleUser = await User.findOne({ _id: req.params.id }).populate(
         "thoughts"
       );
       if (!singleUser) {
         return res.status(404).json({ error: "No user found with that id" });
       }
       return res.json(singleUser);
     } catch (error) {
       return res.status(500).json({ error: error.message });
     }
   };
   // create a new user
const createUser = async (req, res) => {
     try {
       const { username, email } = req.body;
   
       const newUser = await User.create({ username, email });
       return res.json(newUser);
     } catch (error) {
       return res.status(500).json({ error: error.message });
     }
   };
   
   // update the user with the fields from the req.body
   const updateUser = async (req, res) => {
     try {
       const updatedUser = await User.findOneAndUpdate(
         { _id: req.params.id },
         req.body,
         {
           new: true,
           runValidators: true,
         }
       );
   
       if (!updatedUser) {
         return res.status(404).json({ error: "No user found with that id" });
       }
       res.json(updatedUser);
     } catch (error) {
       return res.status(500).json({ error: error.message });
     }
   };
   
   // delete the user based on the given id
   // and delete the thoughts created by that user
   const deleteUser = async (req, res) => {
     try {
       const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
       if (!deletedUser) {
         return res.status(404).json({ error: "No user found with that id" });
       }
       // delete user thoughts
       const deletedThoughts = await Thought.deleteMany({
         _id: { $in: deletedUser.thoughts },
       });
       return res.json({ message: "Delete the user and their thoughts" });
     } catch (error) {
       return res.status(500).json({ error: error.message });
     }
   };
   
   // add a friend to the given user
   const addFriend = async (req, res) => {
     try {
       const updatedUser = await User.findOneAndUpdate(
         { _id: req.params.userId },
         { $addToSet: { friends: req.params.friendId } },
         { new: true, runValidators: true }
       );
   
       if (!updatedUser) {
         return res.status(404).json({ error: "No user found with that id" });
       }
       return res.json(updatedUser);
     } catch (error) {
       return res.status(500).json({ error: error.message });
     }
   };
   
   // remove a friend from a given user
   const removeFriend = async (req, res) => {
     try {
       const updatedUser = await User.findOneAndUpdate(
         { _id: req.params.userId },
         { $pull: { friends: req.params.friendId } },
         { new: true, runValidators: true }
       );
       if (!updatedUser) {
         return res.status(404).json({ message: "No user found with that id" });
       }
       return res.json(updatedUser);
     } catch (error) {
       return res.status(500).json({ error: error.message });
     }
   };
   
   module.exports = {
     getUsers,
     getSingleUser,
     createUser,
     updateUser,
     deleteUser,
     addFriend,
     removeFriend,
   };
   