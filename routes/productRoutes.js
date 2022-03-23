const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
console.log("hello productRouter!");

router.get("/categories", productController.categories);
router.get("/", productController.products);
router.get("/details", productController.details);

module.exports = router;
