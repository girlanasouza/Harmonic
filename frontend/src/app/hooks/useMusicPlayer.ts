import { useContext } from "react";
import { MusicPlayerContext } from "../state/playerProvider";

export const useMusicPlayer = () => {
  const { musicPlayer, setMusicPlayer, play, pause, next, previous } =
    useContext(MusicPlayerContext);

  return { musicPlayer, setMusicPlayer, play, pause, next, previous };
};
