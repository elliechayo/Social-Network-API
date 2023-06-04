const router = require("express").Router();

// controllers
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtsController");

// @route /api/thoughts
router.get("/", getThoughts);
router.post("/", createThought);

// @route /api/thoughts/:id
router.get("/:id", getSingleThought);
router.put("/:id", updateThought);
router.delete("/:thoughtId/:userId", deleteThought);

// @route /api/thoughts/:thoughtId/reactions
router.post("/:thoughtId/reactions", addReaction);

// @route /api/thoughts/:thoughtId/reactions/:reactionId
router.delete("/:thoughtId/reactions/:reactionId", removeReaction);

module.exports = router;
