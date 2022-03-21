const http = require("http");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

const { details } = require("./2");
const { products } = require("./products");
const { categories } = require("./categories");

const app = express();

// app.use 가 있어야 외부에서 json 연결하여 데이터 받을 수 있다.(미들웨어)
app.use(express.json());

// 기본경로를 줌으로서 서버가 켜져있는지 확인
app.get("/", (req, res) => {
  res.send("pong!");
});

app.get("/products/categories", categories);
app.get("/products", products);
app.get("/products/2", details);

// get ID
app.get("/users", async (req, res) => {
  try {
    const getId = await prisma.$queryRaw`
    SELECT * FROM users;`;
    return res.status(201).json({ Message: " SUCCESS !", ID: getId });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: err.message });
  }
});

// post sign up ID & custom error
app.post("/users/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // key 가 없을 때
    if (!email || !password) {
      const keyError = new Error("KEY_ERROR");
      keyError.statusCode = 400;
      throw keyError;
    }

    // 비밀번호가 짧을 때(custom_error)
    if (password.length < 8) {
      const passwordError = new Error("PASSWORD_TOO_SHORT");
      passwordError.statusCode = 400;
      throw passwordError;
    }

    const checkDplct = await prisma.$queryRaw`
        SELECT users.id FROM users WHERE users.email = ${email};`;

    if (checkDplct.length === 1) {
      // ID 중복 (custom_error)
      const emailError = new Error("EXISTING_USER");
      emailError.statusCode = 409;
      throw emailError;
    }

    // 회원가입 성공 시
    const makeHash = bcrypt.hashSync(password, bcrypt.genSaltSync());
    console.log("hashedPassword: ", makeHash);
    await prisma.$queryRaw`
          INSERT INTO users(email, password) VALUES (${email}, ${makeHash});`;

    return res.status(201).json({ Messge: "SIGNUP_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ Message: err.message });
  }
});

// post delete ID
app.post("/users/remove", async (req, res) => {
  try {
    const { email } = req.body;
    const checkEmail = await prisma.$queryRaw`
    SELECT users.id FROM users WHERE users.email = ${email};`;
    if (checkEmail.length === 1) {
      await prisma.$queryRaw`
      DELETE FROM users WHERE email = ${email};`;
      return res.status(200).json({ Message: "DELETED " });
    } else {
      const deleteError = new Error("NOT_EXISTING_USER");
      deleteError.statusCode = 400;
      throw deleteError;
    }
  } catch (err) {
    return res.status(err.statusCode || 500).json({ Message: err.message });
  }
});

// post Login
app.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // key 가 없을 때
    if (!email || !password) {
      const keyError = new Error("KEY_ERROR");
      keyError.statusCode = 400;
      throw keyError;
    }

    const checkDplct = await prisma.$queryRaw`
      SELECT id, password FROM users WHERE users.email = ${email};`;
    // email이 없을 때
    if (checkDplct.length === 0) {
      const loginError = new Error("INVALID_USER");
      loginError.statusCode = 400;
      throw loginError;
    }

    //input password !== db password(비밀번호가 같은지 복호화해서 비교하는 함수)
    const isCorrect = bcrypt.compareSync(password, checkDplct[0].password);
    if (!isCorrect) {
      // 비밀번호가 틀릴 때
      const loginError = new Error("INVALID_USER");
      loginError.statusCode = 400;
      throw loginError;
    }

    // 로그인 성공(token 부여)

    const makeToken = jwt.sign(checkDplct[0].id, process.env.SECRET_KEY);
    return res
      .status(200)
      .json({ message: "SECCESS_LOGIN!", token: makeToken });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ Message: err.message });
  }
});

// put update password
app.put("/users/update", async (req, res) => {
  try {
    const { email, password } = req.body;
    const updateUser = await prisma.$queryRaw`
  UPDATE users SET password = ${password} WHERE users.email = ${email};`;
    return res.status(201).json({ Message: "UPDATE" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: err.message });
  }
});

const server = http.createServer(app);

const start = async () => {
  try {
    server.listen(8000, () => console.log(`Server is listening on 8000`));
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  }
};

start();
