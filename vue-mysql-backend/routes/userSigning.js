const express = require("express");
const { userController } = require("../controllers");

const router = express.Router();

router.post("/", userController.registerUser);
router.post("/", userController.logUser);

module.exports = router;
