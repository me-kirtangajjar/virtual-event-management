const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log(err));

app.use("/", require("./routes/routes"));

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Something went wrong !!!" + err);
  }
  console.log(`Server running on port ${process.env.PORT}`);
});
