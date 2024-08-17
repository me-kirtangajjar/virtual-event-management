const router = require("express").Router();
const { userRegisterValidation } = require("../validators/users.validators");
const { validateRequest } = require("../middlewares/validateRequest");
const {
  usersRegister,
  usersLogin,
  registerForEvent,
} = require("../controllers/usersController");
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
router.get("/events", authMiddleware("organizer"), getEvents);
router.post("/events", authMiddleware("organizer"), postEvents);
router.put("/events", authMiddleware("organizer"), putEvents);
router.delete("/events", authMiddleware("organizer"), deleteEvents);

// POST /events/:id/register for attendee event registration.
router.post(
  "/events/:id/register",
  authMiddleware("attendee"),
  registerForEvent
);

module.exports = router;
