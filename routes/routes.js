const router = require("express").Router();
const { usersRegister, usersLogin } = require("../controllers/usersController");
const { userRegisterValidation } = require("../validators/users.validators");
const { validateRequest } = require("../middlewares/validateRequest");

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
router.get("/events");
router.post("/events");
router.put("/events");
router.delete("/events");

// POST /events/:id/register for attendee event registration.

module.exports = router;
