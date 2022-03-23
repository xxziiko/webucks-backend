const http = require("http");
const express = require("express");
const routes = require("./routes");

const app = express();

// app.use 가 있어야 외부에서 json 연결하여 데이터 받을 수 있다.(미들웨어)
app.use(express.json());
app.use(routes);

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
