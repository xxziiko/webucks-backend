const userDao = require("../models/userDao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const throwError = (massege, statusCode) => {
  const error = new Error(massege);
  error.statusCode = statusCode;
  throw error;
};

const signUp = async (email, password) => {
  try {
    if (password.length < 8) {
      throwError("PASSWORD_TOO_SHORT", 400);
    }

    const user = await userDao.getUserByEmail(email);

    if (user[0]) {
      throwError("EXISTING_USER", 409);
    }

    const encryptedPw = bcrypt.hashSync(password, bcrypt.genSaltSync());

    return await userDao.createUser(email, encryptedPw);
  } catch (err) {
    throw err;
  }
};

const login = async (email, password) => {
  try {
    const user = await userDao.getUserByEmail(email);
    // email 존재여부
    if (!user[0]) {
      throwError("INVALID_USER", 400);
    }

    const isCorrect = bcrypt.compareSync(password, user[0].password);
    if (!isCorrect) {
      // 비밀번호가 틀릴 때
      throwError("INVALID_USER", 400);
    }

    return jwt.sign(user[0].id, process.env.SECRET_KEY);
  } catch (err) {
    throw err;
  }
};

const deleteId = async (email) => {
  const checkUser = await userDao.getUserByEmail(email);

  if (!checkUser[0]) {
    throwError("NOT_EXISTING_USER", 400);
  }

  return await userDao.deleteId(email);
};

const updateId = async (email, password) => {
  const checkUser = await userDao.getUserByEmail(email);

  if (!checkUser[0]) {
    throwError("NOT_EXISTING_USER", 400);
  }

  if (password.length < 8) {
    throwError("PASSWORD_TOO_SHORT", 400);
  }

  const encryptedPw = bcrypt.hashSync(password, bcrypt.genSaltSync());
  return userDao.updateId(email, encryptedPw);
};

const getUser = async (id) => {
  return await userDao.getUser(id);
};
module.exports = { signUp, login, deleteId, updateId, getUser };
