const express = require("express");
const productsRoutes = require("./products");
const tableDataRoutes = require("./tableData");

const router = express.Router();

router.use("/products", productsRoutes);
router.use("/tableData", tableDataRoutes);

module.exports = router;
