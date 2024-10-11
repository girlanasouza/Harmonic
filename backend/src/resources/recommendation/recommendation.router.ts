import { Router } from "express";
import { isAuth } from "../../middlewares/isAuth";
import recommendationController from "./recommendation.controller";

const recommendationRouter = Router();

recommendationRouter.get(
  "/playlists",
  isAuth,
  recommendationController.listAllRecommends
);

recommendationRouter.get(
  "/artists",
  isAuth,
  recommendationController.listAllArtistsRecommends
);

export default recommendationRouter;
