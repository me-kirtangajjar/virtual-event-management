const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/", require("./routes/routes"));

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Something went wrong !!!" + err);
  }
  console.log(`Server running on port ${process.env.PORT}`);
});
