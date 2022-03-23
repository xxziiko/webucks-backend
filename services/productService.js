const productDao = require("../models/productDao");

const categories = async () => {
  try {
    return await productDao.categories();
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

const details = async () => {
  try {
    return await productDao.details();
  } catch (err) {
    throw err;
  }
};

module.exports = { categories, products, details };
