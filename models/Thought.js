const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ReactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false, // we don't need to auto ID this subschema
  }
);

const ThoughtSchema = new mongoose.Schema(
     {
       thoughtText: {
         type: String,
         required: "Thought cannot be empty",
       },
       createdAt: {
         type: Date,
         default: Date.now,
       },
       username: {
         type: String,
         required: true,
       },
       reactions: [ReactionSchema],
     },
     {
       toJSON: {
         virtuals: true,
       },
     }
   );
   
   ThoughtSchema.virtual("reactionCount").get(function () {
     return this.reactions.length;
   });
   
   module.exports = mongoose.model("Thought", ThoughtSchema);   