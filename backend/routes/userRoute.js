import express from "express";
import { getUserData, registerUser } from '../controllers/userController.js'
import { loginUser } from "../controllers/LoginController.js";
import getuserName from "../controllers/usernameController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/get",getUserData);
userRouter.get('/getusername',getuserName);
userRouter.get("/get-user-data",authUser,getUserData);

export default userRouter;