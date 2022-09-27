const mongoose = require("mongoose");

const seekerSchema = mongoose.Schema({
  Name: String,
  Skill: { type: String, required: true },
  Education: String,
  Email: String,
  Password: String,
});
module.exports = mongoose.model("JobSeeker", seekerSchema);
