const userDao = require("../models/userDao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { is } = require("express/lib/request");

const throwError = (massege, statusCode) => {
  const error = new Error(massege);
  error.statusCode = statusCode;
  throw error;
};

const signUp = async (email, password) => {
  try {
    // 비밀번호가 짧을 때(custom_error)
    if (password.length < 8) {
      throwError("PASSWORD_TOO_SHORT", 400);
    }

    const user = await userDao.getUserByEmail(email);

    if (user[0]) {
      // ID 중복 (custom_error)
      throwError("EXISTING_USER", 409);
    }

    // 회원가입 성공 시 비밀번호 암호화
    const encryptedPw = bcrypt.hashSync(password, bcrypt.genSaltSync());

    const newUser = await userDao.createUser(email, encryptedPw);

    return newUser;
  } catch (err) {
    throw err;
  }
};

const login = async (email, password) => {
  try {
    const user = await userDao.getUserByEmail(email);
    // console.log("user_password: ", user[0].id);

    // email 없을 때
    if (!user[0]) {
      throwError("INVALID_USER", 400);
    }
    //input password !== db password(비밀번호가 같은지 복호화해서 비교하는 함수)
    const isCorrect = bcrypt.compareSync(password, user[0].password);
    if (!isCorrect) {
      // 비밀번호가 틀릴 때
      throwError("INVALID_USER", 400);
    }

    const makeToken = jwt.sign(user[0].id, process.env.SECRET_KEY);

    return makeToken;
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
  const updateUser = await userDao.updateId(email, encryptedPw);
  return updateUser;
};
module.exports = { signUp, login, deleteId, updateId };
