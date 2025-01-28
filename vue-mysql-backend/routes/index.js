const tableDataRoutes = require("./tableData");
const productsRoutes = require("./products");
const userSigning = require("./userSigning");
const express = require("express");

const router = express.Router();

router.use("/table-data", tableDataRoutes);
router.use("/products", productsRoutes);
router.use("/register", userSigning);
router.use("/signin", userSigning);

module.exports = router;
