const router = require("express").Router();
const { usersRegister, usersLogin } = require("../controllers/usersController");

// Users route
router.post("/users/register", usersRegister);
router.post("/users/login", usersLogin);

module.exports = router;
