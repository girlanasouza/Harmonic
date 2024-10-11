import { useContext } from "react";
import { PlaylistContext } from "../state/playlistProvider";

export const usePlaylist = () => {
  const { playlists, addPlaylistModal, removePlaylist, altPlaylist } =
    useContext(PlaylistContext);

  return { playlists, addPlaylistModal, removePlaylist, altPlaylist };
};
