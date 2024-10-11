"use client";
import { createContext, useEffect, useState } from "react";
import { PlaylistSimple } from "../types/playlist.type";
import AddPlaylistModal from "../components/AddPlaylistModal/AddPlaylistModal";
import { usePlaylists } from "../hooks/usePlaylists";
import { deletePlaylist } from "../service/playlist";
import AltPlaylistModal from "../components/AltPlaylistModal/AltPlaylistModal";

interface PlaylistContext {
  playlists: PlaylistSimple[];
  addPlaylistModal: () => void;
  removePlaylist: (playlistId: string) => void;
  altPlaylist: (playlist: PlaylistSimple) => void;
}

export const PlaylistContext = createContext<PlaylistContext>({
  playlists: [],
  addPlaylistModal: () => {},
  removePlaylist: () => {},
  altPlaylist: () => {},
});

type PlaylistProps = {
  children: React.ReactNode;
};

const PlaylistProvider = ({ children }: PlaylistProps) => {
  const { playlists, refetch } = usePlaylists();
  const [isAddPlaylistModalOpen, setIsAddPlaylistModalOpen] =
    useState<boolean>(false);
  const [isAltPlaylistModalOpen, setIsAltPlaylistModalOpen] = useState(false);
  const [playlist, setPlaylist] = useState<PlaylistSimple>({
    id: "",
    title: "",
    describe: "",
    url_cover: null,
    length: 0,
    total_time: 0,
  });

  const addPlaylistModal = () => {
    setIsAddPlaylistModalOpen(true);
  };

  const removePlaylist = async (playlistId: string) => {
    try {
      await deletePlaylist(playlistId);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const altPlaylist = (playlist: PlaylistSimple) => {
    setPlaylist(playlist);
    setIsAltPlaylistModalOpen(true);
  };

  const closeModal = () => {
    refetch();
    setIsAltPlaylistModalOpen(false);
  };

  return (
    <PlaylistContext.Provider
      value={{ addPlaylistModal, playlists, removePlaylist, altPlaylist }}
    >
      {children}

      <AddPlaylistModal
        state={[isAddPlaylistModalOpen, setIsAddPlaylistModalOpen]}
        playlists={playlists}
      />

      <AltPlaylistModal
        isOpen={isAltPlaylistModalOpen}
        onClose={() => closeModal()}
        setOpen={setIsAltPlaylistModalOpen}
        statePlaylist={[playlist, setPlaylist]}
      />
    </PlaylistContext.Provider>
  );
};

export default PlaylistProvider;
