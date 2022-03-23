const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
console.log("hello productRouter!");

router.get("/categories/:id", productController.categories);
router.get("", productController.products);
router.get("/details/:id", productController.details);

module.exports = router;
