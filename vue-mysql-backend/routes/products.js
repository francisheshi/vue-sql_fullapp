const express = require("express");
const { productsController } = require("../controllers");

const router = express.Router();

router.get("/", productsController.getProducts);
router.post("/", productsController.addProduct);
router.put("/:id", productsController.updateProduct);

module.exports = router;
