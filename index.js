const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
});

app.use(limiter);
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
