const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const products = async (req, res) => {
  try {
    const getProducts = await prisma.$queryRaw`
    SELECT products.id, 
    products.korean_name AS koreanName,
    products.english_name AS englishName,
    categories.name AS category, 
    products.category_id AS categoryId, 
    product_images.image_url AS imageURL
    FROM products
    JOIN categories ON  products.category_id = categories.id 
    JOIN product_images ON products.id = product_images.product_id;`;
    return res.status(201).json({ getProducts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: err.message });
  }
};
module.exports = { products };
