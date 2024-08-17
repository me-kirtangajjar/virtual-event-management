const jwt = require("jsonwebtoken");

const authMiddleware = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return res
          .status(401)
          .send({ message: "Token required! Please login to generate token" });
      }

      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, process.env.JWTTOKENKEY, (error, decodedToken) => {
        if (error) {
          return res
            .status(401)
            .send({ message: "Invalid token. Please login again." });
        }

        // Check if the user's role is allowed to access this route
        if (!allowedRoles.includes(decodedToken.role)) {
          return res.status(403).send({
            msg: "Access denied. You do not have permission to access this resource.",
          });
        }

        req.user = { id: decodedToken.uid, role: decodedToken.role };
        next();
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong !!!" });
    }
  };
};

module.exports = { authMiddleware };
