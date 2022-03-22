const http = require("http");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const routes = require("./routes");

const prisma = new PrismaClient();

// const { details } = require("./2");
// const { products } = require("./products");
// const { categories } = require("./categories");

const app = express();

// app.use 가 있어야 외부에서 json 연결하여 데이터 받을 수 있다.(미들웨어)
app.use(express.json());
app.use(routes);

// app.get("/products/categories", categories);
// app.get("/products", products);
// app.get("/products/2", details);

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
