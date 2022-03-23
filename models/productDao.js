const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const categories = async (id) => {
  try {
    return await prisma.$queryRaw`
    SELECT id, name FROM categories WHERE id = ${id};`;
  } catch (err) {
    throw err;
  }
};

const products = async () => {
  try {
    return await prisma.$queryRaw`
    SELECT products.id, 
    products.korean_name AS koreanName,
    products.english_name AS englishName,
    categories.name AS category, 
    products.category_id AS categoryId, 
    product_images.image_url AS imageURL
    FROM products
    JOIN categories ON  products.category_id = categories.id 
    JOIN product_images ON products.id = product_images.product_id;`;
  } catch (err) {
    throw err;
  }
};

const details = async (id) => {
  try {
    return await prisma.$queryRaw`
      SELECT p.id,
      p.korean_name AS koreanName,
      p.english_name AS englishName,
      p.description, 
      --- product_images.image_url AS imageURL,
      JSON_ARRAYAGG(allergies.name) AS allergy,
      nutritions.caffein, nutritions.fat, nutritions.sugar, nutritions.sodium
      FROM products p 
      LEFT JOIN products_allergies ON p.id = products_allergies.product_id
      LEFT JOIN allergies ON allergies.id = products_allergies.allergy_id
      JOIN product_images ON p.id = product_images.product_id
      JOIN nutritions ON p.id = nutritions.product_id
      WHERE p.id = ${id}
      GROUP BY p.id;`;
  } catch (err) {
    throw err;
  }
};
module.exports = { categories, products, details };
