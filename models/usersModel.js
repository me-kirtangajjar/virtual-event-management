const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const usersSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: true,
  },
  password: { type: String, required: true },
  role: { type: String, enum: ["organizer", "attendee"], required: true },
  registeredEvents: { type: [String] },
});

module.exports = model("users", usersSchema);
