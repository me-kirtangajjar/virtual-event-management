const moment = require("moment");
const eventModel = require("../models/eventModel");

const getEvents = async (req, res) => {
  try {
    const allEvents = await eventModel.find();
    return res
      .status(200)
      .send({ msg: "Events fetched successfully", data: allEvents });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};
const postEvents = async (req, res) => {
  try {
    const { title, description, date, time, organizerId } = req.body;

    const eventData = { title, description, date, time, organizerId };

    await eventModel.create(eventData);

    return res
      .status(201)
      .send({ msg: "Events created successfully", data: eventData });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};
const putEvents = async (req, res) => {
  try {
    const { title, description, date, time, organizerId, participants } =
      req.body;
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};
const deleteEvents = async (req, res) => {
  try {
    const { title, description, date, time, organizerId, participants } =
      req.body;
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = { getEvents, postEvents, putEvents, deleteEvents };
