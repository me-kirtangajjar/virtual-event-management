const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  organizerId: { type: String },
  participants: { type: [String] },
});

module.exports = model("events", eventSchema);
