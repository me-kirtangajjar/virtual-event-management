const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log(err));

app.use("/api", require("./routes/routes"));

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Something went wrong !!!" + err);
  }
  console.log(`Server running on port ${process.env.PORT}`);
});
