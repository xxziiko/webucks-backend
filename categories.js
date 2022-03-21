const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categories = async (req, res) => {
  try {
    const getCategories = await prisma.$queryRaw`
      SELECT id, name FROM categories`;
    return res.status(201).json({ getCategories });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: err.message });
  }
};

module.exports = { categories };
