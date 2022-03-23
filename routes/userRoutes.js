const express = require("express");
const router = express.Router();

// Route 는 오직 Controller 에만 의존 합니다.
const userController = require("../controllers/userController");
console.log("hello child router");
// Route 는 오직 Controller 에만 의존 합니다.
router.post("/delete", userController.deleteId);

router.post("/signup", userController.signUp);

router.post("/login", userController.login);

router.put("/update", userController.updateId);

router.get("/:id", userController.getUser);
// router.get("/", userController.getUser);
// 이렇게 내보내면 부모 router 에 자동으로 연결됩니다.
module.exports = router;
