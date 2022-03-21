const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const details = async (req, res) => {
  try {
    //ARRAYAGG 로 allergy 배열만들기.
    const getDetail = await prisma.$queryRaw`
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
    GROUP BY p.id;`;
    return res.status(201).json({ getDetail });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: err.message });
  }
};

module.exports = { details };
