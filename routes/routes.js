const router = require("express").Router();
const { userRegisterValidation } = require("../validators/users.validators");
const { validateRequest } = require("../middlewares/validateRequest");
const { usersRegister, usersLogin } = require("../controllers/usersController");
const { authMiddleware } = require("../middlewares/auth");
const {
  getEvents,
  postEvents,
  putEvents,
  deleteEvents,
} = require("../controllers/eventController");

// Health check endpoint for monitoring purposes.
router.get("/health", (req, res) => {
  return res.status(200).send({ status: "OK" });
});

// POST /register and POST /login for user authentication.
router.post(
  "/users/register",
  userRegisterValidation,
  validateRequest,
  usersRegister
);
router.post("/users/login", usersLogin);

// GET, POST, PUT, DELETE /events for event management.
router.get("/events", getEvents);
router.post("/events", authMiddleware, postEvents);
router.put("/events", authMiddleware, putEvents);
router.delete("/events", authMiddleware, deleteEvents);

// POST /events/:id/register for attendee event registration.

module.exports = router;
