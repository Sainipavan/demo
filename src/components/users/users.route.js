const router = require("express").Router();
const { login, signUp } = require("./users.controller");

router.post("/signup", signUp);
router.post("/login", login);

module.exports = router;
