const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route.js");
const app = express();

app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://Nishant-R:cMVSc6ePV6V4dr03@cluster0.rembes2.mongodb.net/Job-Technical-Round",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err.message));

app.use("/", route);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on " + (process.env.PORT || 3000));
});
