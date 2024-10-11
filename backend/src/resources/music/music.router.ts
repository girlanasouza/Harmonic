// music.router.ts
import { Router } from "express";
import musicController from "./music.controller";

const musicRouter = Router();

musicRouter.get("/:id", musicController.streamingMusic);
musicRouter.get("/details/:id", musicController.getMusicMetadata);

musicRouter.post("/search", musicController.searchMusic);

export default musicRouter;
