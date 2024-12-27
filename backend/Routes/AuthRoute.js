const { userVerification } = require("../Middlewares/AuthMiddleware");
const { Signup, Login } = require("../Controllers/AuthController");

const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/verify", userVerification); // Renamed the route to be more descriptive

module.exports = router;
