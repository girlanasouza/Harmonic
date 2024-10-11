import { Router } from "express";
import playlistController from "./playlist.controller";
import { isAuth } from "../../middlewares/isAuth";

const playListRouter = Router();

playListRouter.get("/", isAuth, playlistController.listAllPlaylists);
playListRouter.get("/:playlistId", isAuth, playlistController.readPlaylist);
playListRouter.post("/", isAuth, playlistController.createPlaylist);
playListRouter.put("/:playlistId", isAuth, playlistController.updatePlaylist);
playListRouter.delete(
  "/:playlistId",
  isAuth,
  playlistController.removePlaylist
);

playListRouter.post(
  "/:playlistId/:musicId",
  isAuth,
  playlistController.pushMusicPlaylist
);
playListRouter.delete(
  "/:playlistId/:musicId",
  isAuth,
  playlistController.deleteMusicPlaylist
);

export default playListRouter;
