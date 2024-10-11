import { useState, useRef, useEffect } from "react";
import { useMusicPlayer } from "@/app/hooks/useMusicPlayer";
import { useMusicStreaming } from "@/app/hooks/useMusicStreaming";
import { mockArtists } from "@/app/mocks/artists";
import { SongAPI } from "@/app/types/search.type";
import Image from "next/image";
import { MdMoreHoriz } from "react-icons/md";
import AddPlaylistModal from "../AddPlaylistModal/AddPlaylistModal";
import {
  overlayStyles,
  modalContentStyles,
  playlistModalOverlayStyles,
  playlistModalContentStyles,
  buttonStyles,
  playlistItemStyles,
} from "./styles";
import { usePlaylistAddMusic, usePlaylists } from "@/app/hooks/usePlaylists";
import { formatDuration } from "@/app/utils/formatDuration";
import { toast } from "react-toastify";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { CellItemWithoutBold } from "../CardPlaylistListing/style";

interface CardArtistsProps {
  song: SongAPI;
}

const Row = ({ children }: { children: React.ReactNode }) => {
  return (
    <CellItemWithoutBold>
      <div className="">
        <p className="">{children}</p>
      </div>
    </CellItemWithoutBold>
  );
};

const SearchMusic = ({ song }: CardArtistsProps) => {
  const { setMusicPlayer } = useMusicPlayer();
  const { songs } = useMusicStreaming([song.id]);

  const handleClick = () => {
    setMusicPlayer({
      currentIndex: 0,
      isPlaying: true,
      songs: [
        {
          name: song.album.name,
          src: songs[0].url,
          title: song.title,
          artist: song.artist.name,
          img_url: song.album.img_url,
        },
      ],
    });
    return null;
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [isAddPlaylistModalOpen, setIsAddPlaylistModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handlePlaylistModalToggle = () => {
    setIsPlaylistModalOpen((prev) => !prev);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  const handlePlaylistOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsPlaylistModalOpen(false);
    }
  };

  const handleCreatePlaylist = () => {
    setIsAddPlaylistModalOpen(true);
  };

  const { playlists } = usePlaylists();

  const [musicAndPlaylist, setmusicAndPlaylist] = useState<{
    musicId: string;
    playlistId: string;
  }>({ musicId: "", playlistId: "" });

  const { response } = usePlaylistAddMusic(
    musicAndPlaylist.musicId,
    musicAndPlaylist.playlistId
  );

  useEffect(() => {
    if (response?.id && response.describe) {
      setmusicAndPlaylist({
        musicId: "",
        playlistId: "",
      });
      setIsPlaylistModalOpen(false); // Fecha o modal após a adição à playlist
    }
  }, [response]);

  const handleClickAddtoPlaylist = (playlistId: string) => {
    setmusicAndPlaylist({
      musicId: song.id,
      playlistId: playlistId,
    });
    toast.success("Added Successfully!!");
  };

  return (
    <>
      <div className="d-flex mt-3" style={{ maxWidth: "80vw" }}>
        <CellItemWithoutBold>
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={song.album.img_url}
              className="img-fluid rounded-start"
              alt="..."
              width={200}
              height={200}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <i
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`bi text-light bi-play${isHovered ? "-fill" : ""} fs-2 `}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
        </CellItemWithoutBold>

        <Row>
          <p className="fw-light text-black">{song.title}</p>
        </Row>
        <Row>
          <p className="fw-light text-black">{song.album.name}</p>
        </Row>
        <Row>
          <p className="fw-light text-black">{song.artist.name}</p>
        </Row>
        <Row>
          <p className="fw-light text-black">{`${formatDuration(song.duration)}`}</p>
        </Row>
        <Row>
          <Tooltip title="Adicionar à Playlist">
            <IconButton onClick={handlePlaylistModalToggle}>
              <AddCircleOutlineIcon color="info" />
            </IconButton>
          </Tooltip>
        </Row>
      </div>

      <hr />

      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={handleOverlayClick}
          style={overlayStyles}
        >
          <div
            className="modal-content"
            ref={modalRef}
            style={{
              ...modalContentStyles,
              top: buttonRef.current
                ? buttonRef.current.getBoundingClientRect().bottom +
                  window.scrollY -
                  75
                : "auto",
              left: buttonRef.current
                ? buttonRef.current.getBoundingClientRect().left +
                  window.scrollX -
                  178
                : "auto",
            }}
          >
            <p
              style={{
                margin: 0,
                cursor: "pointer",
              }}
              onClick={handlePlaylistModalToggle}
            >
              Adicionar à playlist
            </p>
          </div>
        </div>
      )}

      {isPlaylistModalOpen && (
        <div
          className="playlist-modal-overlay"
          onClick={handlePlaylistOverlayClick}
          style={playlistModalOverlayStyles}
        >
          <div
            className="playlist-modal-content"
            ref={modalRef}
            style={playlistModalContentStyles}
          >
            <h4 className="fw-normal text-info-emphasis">Playlists</h4>

            <button onClick={handleCreatePlaylist} className="btn text-start">
              <i
                className="bi bi-plus-lg text-black"
                style={{ cursor: "pointer" }}
              ></i>
              New Playlist
            </button>

            <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
              {playlists.map((playlist) => (
                <li key={playlist.id} style={{ cursor: "pointer" }}>
                  <div
                    className="m-2 "
                    style={{
                      backgroundColor: "#d6d8e8",
                    }}
                  >
                    <button
                      className="w-100 btn "
                      onClick={() => handleClickAddtoPlaylist(playlist.id)}
                    >
                      {playlist.title}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <AddPlaylistModal
        state={[isAddPlaylistModalOpen, setIsAddPlaylistModalOpen]}
        playlists={playlists}
      />
    </>
  );
};

export default SearchMusic;
