import express from "express";
import { getUserData, registerUser } from '../controllers/userController.js'
import { loginUser } from "../controllers/LoginController.js";

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/get",getUserData);

export default userRouter;