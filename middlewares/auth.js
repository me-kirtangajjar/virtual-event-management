const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .send({ message: "Token required! Please login to generate token" });
    }

    jwt.verify(token, process.env.JWTTOKENKEY, (error, decodedString) => {
      if (error) {
        return res.status(401).send({ message: "Login" });
      }

      if (decodedString.role === "attendee") {
        return res
          .status(401)
          .send({ msg: "Can't create event, register as organizer" });
      }

      req.body.organizerId = decodedString.uid;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong !!!" });
  }
};
module.exports = { authMiddleware };
