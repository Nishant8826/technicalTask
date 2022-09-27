const jobSeekerModel = require("../model/jobSeeker.js");
const jwt = require("jsonwebtoken");
const { findOne } = require("../model/jobSeeker.js");

const createUser = async (req, res) => {
  try {
    const data = req.body;
    if (!data.Skill)
      return res.status(400).send({ status: false, msg: "Skill is mandatory" });
    const saveData = await jobSeekerModel.create(data);
    res.status(201).send({ status: true, msg: "Success", data: saveData });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    const findEmail = await jobSeekerModel.findOne({ Email: data.Email });
    if (!findEmail)
      return res.status(404).send({ status: false, msg: "User not found" });
    const jwtToken = await jwt.sign(
      { userId: findEmail._id.toString() },
      "Technical-Round-Connection LLP"
    );
    res.setHeader("x-api-key", jwtToken);
    res.status(200).send({ status: true, msg: "Success", Token: jwtToken });
  } catch (error) {}
};

const fetchSeeker = async (req, res) => {
  try {
    let data = req.query;
    const userId = req.params.userId;
    if (res.token.userId != userId)
      return res.status(401).send({ status: false, msg: "Unauthorized" });
      const findUser = await jobSeekerModel.findById(userId);
      if (!findUser)
      return res.status(404).send({ status: false, msg: "User Not Found" });
      if (!data.Skill) {
        const findData = await jobSeekerModel
          .find()
          .sort({ Name: 1 })
          .collation({ locale: "en" });

        if (findData.length == 0)
          return res.status(404).send({ status: false, msg: "No Data Found" });
        return res.status(200).send({
          status: true,
          msg: `${findData.length} Match found`,
          data: findData,
        });
      }
    const findData = await jobSeekerModel
      .find({ Skill: { $regex: data.Skill } })
      .sort({ Name: 1 })
      .collation({ locale: "en" });

    if (findData.length == 0)
      return res.status(404).send({ status: false, msg: "No Data Found" });
    return res.status(200).send({
      status: true,
      msg: `${findData.length} Match found`,
      data: findData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = { createUser, login, fetchSeeker };
