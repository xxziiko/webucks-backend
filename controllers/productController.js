const productService = require("../services/productService");

const categories = async (req, res, next) => {
  try {
    console.log("productcontroller!!");

    const catergory = await productService.categories();
    console.log("after getting productService!!");

    return res.status(200).json({ catergory });
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }
};

const products = async (req, res, text) => {
  try {
    const product = await productService.products();
    return res.status(200).json({ product });
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }
};

const details = async (req, res, text) => {
  try {
    const detail = await productService.details();
    return res.status(200).json({ detail });
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }
};

module.exports = { categories, products, details };
