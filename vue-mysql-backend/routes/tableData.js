const express = require("express");
const { tableDataController } = require("../controllers");

const router = express.Router();

router.get("/", tableDataController.getTableData);

module.exports = router;
