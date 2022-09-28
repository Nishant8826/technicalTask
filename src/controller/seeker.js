const seekerModel = require("../model/seeker.js");
const jobModel=require("../model/job.js")
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const data = req.body;
    //if skill is not present in body
    if (!data.Skill)
      return res.status(400).send({ status: false, msg: "Skill is mandatory" });
    const saveData = await seekerModel.create(data);
    res.status(201).send({ status: true, msg: "Success", data: saveData });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    //searching for email id in database
    const findEmail = await seekerModel.findOne({ Email: data.Email });
    if (!findEmail)
      return res.status(404).send({ status: false, msg: "User not found" });
    //signing in using jwt
    const jwtToken = await jwt.sign(
      { userId: findEmail._id.toString() },
      "Technical-Round-Connection LLP"
    );
    //setting header in response body
    res.setHeader("x-api-key", jwtToken);
    res.status(200).send({ status: true, msg: "Success", Token: jwtToken });
  } catch (error) {}
};

const fetchSeeker = async (req, res) => {
  try {
    let data = req.query;
    const userId = req.params.userId;
    //checking for authorisation by comparing userId present in token with Id present in params
    if (res.token.userId != userId)
      return res.status(401).send({ status: false, msg: "Unauthorized" });
    //checking email is present in database
    const findUser = await seekerModel.findById(userId);
    if (!findUser)
      return res.status(404).send({ status: false, msg: "User Not Found" });
    //when thw user is not filtering with any tag
    if (!data.Skill) {
      const findData = await jobModel
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
    //when the user is filtering with any tags
    const findData = await jobModel
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
