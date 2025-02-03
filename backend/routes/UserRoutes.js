import express from "express";
import {
  login,
  logout,
  persistUserSession,
  sendResetPasswordOTP,
  signUp,
  updatePassword,
  verifyOtp,
} from "../controllers/User.controller.js";
import { AdminOnly } from "../middleware/Auth.js";


const userRouter = express.Router();

userRouter.post("/users/signup", signUp);
userRouter.post("/users/login", login);
userRouter.delete("/users/logout",AdminOnly,logout);
userRouter.post("/users/updatePassword", updatePassword);
userRouter.post("/users/sendResetPasswordOTP", sendResetPasswordOTP);
userRouter.post("/users/verifyOtp", verifyOtp);
userRouter.get("/users/persistUserSession", persistUserSession);

export default userRouter;
