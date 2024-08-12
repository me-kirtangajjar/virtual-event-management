const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/usersModel");

const usersRegister = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const isUserExist = await usersModel.findOne({ email });
    if (isUserExist) {
      return res
        .status(400)
        .send({ message: "Email already exist, try to login" });
    }

    const hashPassword = await bcrypt.hash(password, 8);
    await usersModel.create({ email, password: hashPassword, role });
    return res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const usersLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExist = await usersModel.findOne({ email });
    if (!isUserExist) {
      return res
        .status(404)
        .send({ message: "User not registered, Try to register first" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).send({ message: "Enter valid credentials" });
    }

    usersJwtPayload = {};

    return res
      .status(200)
      .send({
        message: "User logged in successfully",
        Authorization: jwt.sign(usersJwtPayload, process.env.JWTTOKENKEY, {
          expiresIn: "30d",
        }),
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = { usersRegister, usersLogin };
