const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "User name is required",
    },
    email: {
      type: String,
      unique: true,
      required: "Email is required",
      match: [/.+@.+\..+/],
    },
    thoughts: [{ type: ObjectId, ref: "Thought" }],
    friends: [{ type: ObjectId, ref: "User" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

module.exports = mongoose.model("User", UserSchema);
