// v1Router.ts
import { Router } from "express";
import musicRouter from "../resources/music/music.router";
import playListRouter from "../resources/playlist/playlist.router";
import userRouter from "../resources/user/user.router";
import authRouter from "../resources/auth/auth.router";
import recommendationRouter from "../resources/recommendation/recommendation.router";

const v1Router = Router();

v1Router.use(
  "/music",
  /* #swagger.tags = ['Music'] */
  musicRouter
);

v1Router.use(
  "/playlist",
  /* #swagger.tags = ['Playlist'] */
  playListRouter
);

v1Router.use(
  "/user",
  /* #swagger.tags = ['User'] */
  userRouter
);

v1Router.use(
  "/authentication",
  /* #swagger.tags = ['Auth'] */
  authRouter
);

v1Router.use(
  "/recommedations",
  /* #swagger.tags = ['Recommedations'] */
  recommendationRouter
);

export default v1Router;
