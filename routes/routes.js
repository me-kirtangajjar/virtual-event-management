const router = require("express").Router();
const { usersRegister } = require("../controllers/usersController");

router.post("/users/register", usersRegister);

module.exports = router;
