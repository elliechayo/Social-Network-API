const Thought = require("../models/Thought");
const User = require("../models/User");


// fetch all thoughts and return it
const getThoughts = async (req, res) => {
     try {
       const allThoughts = await Thought.find({}).populate("reactions");
       return res.json(allThoughts);
     } catch (error) {
       return res.status(500).json({ error: error.message });
     }
   };
   
   // fetch and return a single thought based on the given id
   const getSingleThought = async (req, res) => {
     try {
       const singleThought = await Thought.findOne({
         _id: req.params.id,
       }).populate("reactions");
       if (!singleThought) {
         return res.status(404).json({ error: "No thoughts found with that id" });
       }
       return res.json(singleThought);
     } catch (error) {
       return res.status(500).json({ error: error.message });
     }
   };

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
   // update a thought based on the id
const updateThought = async (req, res) => {
     try {
       const updatedThought = await Thought.findOneAndUpdate(
         { _id: req.params.id },
         req.body,
         { new: true, runValidators: true }
       );
   
       if (!updatedThought) {
         return res.status(404).json({ error: "No thought found with that id" });
       }
       res.json(updatedThought);
     } catch (error) {
       return res.status(500).json({ error: error.message });
     }
   };

