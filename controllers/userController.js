const userService = require("../services/userService");

const throwError = (massege, statusCode) => {
  const error = new Error(massege);
  error.statusCode = statusCode;
  throw error;
};

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // key 가 없을 때
    if (!email || !password) {
      throwError("KEY_ERROR", 400);
    }

    await userService.signUp(email, password);

    return res.status(201);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ Message: err.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // key 가 없을 때
    if (!email || !password) {
      throwError("KEY_ERROR", 400);
    }

    const userToken = await userService.login(email, password);
    return res
      .status(200)
      .json({ message: "SECCESS_LOGIN!", token: userToken });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ Message: err.message });
  }
};

const deleteId = async (req, res, next) => {
  try {
    const { email } = req.body;
    await userService.deleteId(email);
    return res.status(200);
  } catch (err) {
    return res.status(err.statusCode || 500).json({ Message: err.message });
  }
};

const updateId = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await userService.updateId(email, password);
    return res.status(201).json({ Message: "UPDATE" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ Message: err.message });
  }
};

const getUser = async (req, res, text) => {
  try {
    const id = req.params.id;
    const getId = await userService.getUser(id);
    if (!getId[0]) {
      throwError("KEY_ERROR", 400);
    }
    return res.status(200).json({ ID: getId });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ Message: err.message });
  }
};
module.exports = { signUp, login, deleteId, updateId, getUser };
