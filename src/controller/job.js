const jobModel = require("../model/job.js");

const createJob = async (req, res) => {
  try {
    const data = req.body;
    if (!data.Skill)
      return res.status(400).send({ status: false, msg: "Skill is required" });
    const saveData=await jobModel.create(data)
    return res.status(201).send({status:true,msg:"Success",data:saveData})
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = { createJob };
