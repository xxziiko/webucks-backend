const productDao = require("../models/productDao");

const categories = async (id) => {
  try {
    return await productDao.categories(id);
  } catch (err) {
    throw err;
  }
};

const products = async () => {
  try {
    return await productDao.products();
  } catch (err) {
    throw err;
  }
};

const details = async (id) => {
  try {
    return await productDao.details(id);
  } catch (err) {
    throw err;
  }
};

module.exports = { categories, products, details };
