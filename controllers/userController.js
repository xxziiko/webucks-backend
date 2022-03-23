const userService = require("../services/userService");

const throwError = (massege, statusCode) => {
  const error = new Error(massege);
  error.statusCode = statusCode;
  throw error;
};

const signUp = async (req, res, next) => {
  try {
    console.log("controller!!");
    const { email, password } = req.body;

    // key 가 없을 때
    if (!email || !password) {
      throwError("KEY_ERROR", 400);
    }

    const user = await userService.signUp(email, password);

    return res.status(201).json({ Messge: "SIGNUP_SUCCESS", user: user });
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
      const keyError = new Error("KEY_ERROR");
      keyError.statusCode = 400;
      throw keyError;
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
    const user = await userService.deleteId(email);
    return res.status(200).json({ Message: "DELETED " });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ Message: err.message });
  }
};

const updateId = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const updateUser = await userService.updateId(email, password);
    return res.status(201).json({ Message: "UPDATE", updateUser });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ Message: err.message });
  }
};

const getUser = async (req, res, text) => {
  try {
    const getId = await userService.getUser();
    return res.status(200).json({ Message: " SUCCESS !", ID: getId });
    return;
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }
};
module.exports = { signUp, login, deleteId, updateId, getUser };
