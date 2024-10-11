import { Router } from "express";
import authController from "./auth.controller";

const authRouter = Router();
authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/check", authController.checkSession);

export default authRouter;
