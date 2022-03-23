const productService = require("../services/productService");

const categories = async (req, res, next) => {
  try {
    const id = req.params.id;

    const catergory = await productService.categories(id);

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
    const id = req.params.id;
    const detail = await productService.details(id);
    return res.status(200).json({ detail });
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }
};

module.exports = { categories, products, details };
