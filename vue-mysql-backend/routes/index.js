const express = require("express");
const productsRoutes = require("./products");
const tableDataRoutes = require("./tableData");

const router = express.Router();

router.use("/products", productsRoutes);
router.use("/table-data", tableDataRoutes);

module.exports = router;
