import CardPlaylistListing from "../CardPlaylistListing/CardPlaylistListing";
import NavigationBar from "../NavigationBar/NavigationBar";
import { BodyWrapper } from "../SearchPage/styles";
import { CellItem, HeaderPlaylists } from "./style";
import { FaPlusCircle } from "react-icons/fa";
import AddPlaylistModal from "../AddPlaylistModal/AddPlaylistModal";
import { useState } from "react";
import { usePlaylist } from "@/app/hooks/usePlaylist";
import { MusicPlayerContext } from "@/app/state/playerProvider";
import { useMusicPlayer } from "@/app/hooks/useMusicPlayer";

const PlaylistListingPage = () => {
  const { playlists, addPlaylistModal } = usePlaylist();
  const { musicPlayer } = useMusicPlayer();
  return (
    <div className="container-fluid d-flex" style={{ overflow: "hidden" }}>
      <div
        className="col h-100 overflow-auto"
        style={{ maxHeight: `${musicPlayer.songs.length ? "85vh" : "90vh"}` }}
      >
        <h4 className="fw-normal text-info-emphasis">
          Biblioteca de Playlists
        </h4>
        <p className="fw-light">Suas Playlists são guardadas aqui :)</p>
        <HeaderPlaylists>
          <CellItem className="fw-normal">Capa</CellItem>
          <CellItem className="fw-normal">Nome da Playlist</CellItem>
          <CellItem className="fw-normal">Total de Músicas</CellItem>
          <CellItem className="fw-normal">Duração total</CellItem>
          <CellItem>
            <i
              className="bi bi-plus-circle fs-4"
              onClick={() => {
                addPlaylistModal();
              }}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </CellItem>
        </HeaderPlaylists>
        <hr></hr>
        <div>
          {playlists.map((playlist) => (
            <CardPlaylistListing
              key={`Card_${playlist.id}`}
              playlist={playlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistListingPage;
