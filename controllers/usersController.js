const bcrypt = require("bcrypt");
const usersModel = require("../models/usersModel");

const usersRegister = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const isUserExist = await usersModel.findOne({ email });
    if (isUserExist) {
      return res
        .status(400)
        .send({ message: "Email already exist, try to login." });
    }

    const hashPassword = await bcrypt.hash(password, 8);
    await usersModel.create({ email, password: hashPassword, role });
    return res.send("good");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = { usersRegister };
