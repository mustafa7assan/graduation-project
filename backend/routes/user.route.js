const express = require("express");
const userController = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");

const userRouter = express.Router();

userRouter.post("/", userController.registerUser);
userRouter.post("/auth", userController.authUser);
userRouter.post("/logout", userController.logoutUser);
userRouter.get("/profile/:id", userController.getUserProfile);

module.exports = userRouter;
