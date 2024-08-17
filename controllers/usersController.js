const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const usersModel = require("../models/usersModel");
const eventModel = require("../models/eventModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAILUSER,
    pass: process.env.EMAILPASS,
  },
});

const usersRegister = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }

    const { email, password, role } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof role !== "string"
    ) {
      return res.status(400).send({ message: "Enter valid input type" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .send({ message: "Password length should be greater than 6" });
    }

    if (role !== "organizer" && role !== "attendee") {
      return res.status(400).send({ message: "Enter valid user role" });
    }

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

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).send({ message: "Enter valid input type" });
    }

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

    return res.status(200).send({
      message: "User logged in successfully",
      Authorization: jwt.sign(
        { uid: isUserExist._id, role: isUserExist.role },
        process.env.JWTTOKENKEY,
        {
          expiresIn: "30d",
        }
      ),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const registerForEvent = async (req, res) => {
  try {
    const isEventExist = await eventModel.findById(req.params.id);
    if (!isEventExist) {
      return res.status(404).send({ msg: "Event not found" });
    }

    const isUserExist = await usersModel.findById(req.user.id);
    if (!isUserExist) {
      return res.status(404).send({ msg: "User not found" });
    }

    const mailOptions = {
      from: process.env.EMAILUSER,
      to: isUserExist.email,
      subject: "🎉 You’re Registered! | Event Registration Confirmation",
      html: `
      <div style="font-family: Arial, sans-serif; color: #333">
  <div style="background-color: #f7f7f7; padding: 20px; text-align: center">
    <h2 style="color: #4caf50">🎉 Congratulations, You’re Registered!</h2>
  </div>

  <div style="padding: 20px">
    <p style="font-size: 16px; line-height: 1.5">
      Thank you for registering !!!
    </p>

    <div
      style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 20px"
    >
      <h3 style="color: #333">Event Details</h3>
      <ul
        style="
          font-size: 16px;
          line-height: 1.5;
          list-style-type: none;
          padding: 0;
        "
      >
        <li>
          <strong>Event Name:</strong> ${isEventExist.title}
        </li>
        <li><strong>Date:</strong> ${isEventExist.date}</li>
        <li><strong>Location:</strong> Online </li>
      </ul>
    </div>

    <p style="margin-top: 30px; font-size: 14px; color: #777">
      If you have any questions, feel free to reply to this email or contact our
      support team at support@youremail.com.
    </p>

    <div
      style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 20px"
    >
      <p style="font-size: 14px; color: #777; text-align: center">
        © 2024 Kirtan Gajjar |
        <a
          href="https://www.linkedin.com/in/me-kirtangajjar"
          target="_blank"
          style="color: #4caf50"
          >Visit our website</a
        >
      </p>
    </div>
  </div>
</div>
  `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });

    isEventExist.participants.push(req.user.id);

    await eventModel.findByIdAndUpdate(req.params.id, isEventExist);

    return res.status(200).send({ msg: "Registration successful!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = { usersRegister, usersLogin, registerForEvent };
