const router = require("express").Router();
const { addMembers, createGroup } = require("./groupChat.controller");
const authMiddleware = require("../../middleware/jwt");

router.post("/addMembers", authMiddleware, addMembers);
router.post("/createGroup", authMiddleware, createGroup);

module.exports = router;
