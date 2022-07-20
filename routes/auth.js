const router = require("express").Router();

const authControllers = require("../controllers/auth-controllers");

//REGISTER
router.post("/register", authControllers.register);

//LOGIN
router.post("/login", authControllers.login);

module.exports = router;
