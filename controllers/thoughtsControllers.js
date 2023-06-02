const Thought = require("../models/Thought");
const User = require("../models/User");


// create a new thought
// add the newly created thought to the given user
const createThought = async (req, res) => {
     if (!req.body.userId) {
       return res
         .status(400)
         .json({ error: "Please include userId field in request body" });
     }
     try {
       const newThought = await Thought.create(req.body);
       const updatedUser = await User.findOneAndUpdate(
         { _id: req.body.userId },
         { $push: { thoughts: newThought._id } },
         { new: true, runValidators: true }
       );
       if (!updatedUser) {
         return res.status(404).json({ error: "No user found with that id" });
       }
       return res.json({ message: "Thought created" });
     } catch (error) {
       return res.status(500).json({ error: error.message });
     }
   };
   