const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  username: { type: String, required: true, unique: true },
  salt: { type: String, required: true },
  hash: { type: String, required: true }
});



module.exports = mongoose.model("User", userSchema)