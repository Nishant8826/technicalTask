const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  Role: String,
  Skill: { type: String, required: true },
  Desciption: String,
  Package:String
});
module.exports = mongoose.model("Job", jobSchema);
