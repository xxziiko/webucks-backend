const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUserByEmail = async (email) => {
  return await prisma.$queryRaw`
    SELECT id, password FROM users WHERE users.email = ${email};`;
};

const createUser = async (email, encryptedPw) => {
  return await prisma.$queryRaw`
    INSERT INTO users(email, password) VALUES (${email}, ${encryptedPw});`;
};

const deleteId = async (email) => {
  return await prisma.$queryRaw`
  DELETE FROM users WHERE email = ${email};`;
};

const updateId = async (email, password) => {
  return await prisma.$queryRaw`
  UPDATE users SET password = ${password} WHERE users.email = ${email};`;
};

const getUser = async (id) => {
  return await prisma.$queryRaw`
  SELECT * FROM users WHERE id = ${id};`;
};
module.exports = { getUserByEmail, createUser, deleteId, updateId, getUser };
