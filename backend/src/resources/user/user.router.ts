import { Router } from "express";
import userController from "./user.controller";

const userRouter = Router();

userRouter.post("/", userController.create);
userRouter.get("/:id", userController.read);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.remove);

export default userRouter;
