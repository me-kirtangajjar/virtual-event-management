const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    organizerId: { type: ObjectId, ref: "users" },
    participants: [{ type: ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

module.exports = model("events", eventSchema);
