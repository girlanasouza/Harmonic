import React, { Dispatch, SetStateAction, useState } from "react";
import {
  modalOverlayStyles,
  modalContentStyles,
  closeButtonStyles,
  inputContainerStyles,
  inputLabelStyles,
  inputStyles,
  textAreaStyles,
  buttonStyles,
  formContainerStyles,
  imageUploadContainerStyles,
  formStyles,
  buttonContainerStyles,
} from "./styles";
import { createPlaylist } from "@/app/service/playlist";
import { PlaylistCreate, PlaylistSimple } from "@/app/types/playlist.type";
import { toast } from "react-toastify";

interface AddPlaylistModalProps {
  state: [boolean, Dispatch<SetStateAction<boolean>>];
  playlists?: PlaylistSimple[];
}

const AddPlaylistModal: React.FC<AddPlaylistModalProps> = ({
  state,
  playlists,
}) => {
  const [isAddPlaylistModalOpen, setIsAddPlaylistModalOpen] = state;
  const [playlist, setPlaylist] = useState<PlaylistCreate>({
    title: "",
    describe: "",
    url_cover: "",
  });

  const handleCreatePlaylist = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (playlist) {
        const data = (await createPlaylist(playlist)) as PlaylistSimple;

        if (playlists) playlists.push({ ...data, length: 0, total_time: 0 });

        setIsAddPlaylistModalOpen(false);
        toast.success("Sucesso!!");
      }
    } catch (err) {
      toast.error("Ocorreu um erro inesperado!");
      console.log(err);
    }
  };

  const handleImage = async (event: React.FormEvent) => {};

  if (!isAddPlaylistModalOpen) return null;

  return (
    <div id="modal-overlay" style={modalOverlayStyles}>
      <div style={modalContentStyles}>
        <button
          onClick={() => setIsAddPlaylistModalOpen(false)}
          style={closeButtonStyles}
        >
          <i className="bi bi-x"></i>
        </button>
        <h5>Criar Playlist</h5>
        <div style={formContainerStyles}>
          <div style={imageUploadContainerStyles}>
            <i className="bi bi-camera" style={{ fontSize: "2rem" }}></i>
          </div>
          <form style={formStyles} onSubmit={handleCreatePlaylist}>
            <div style={inputContainerStyles}>
              <label style={inputLabelStyles}>Nome</label>
              <input
                type="text"
                value={playlist?.title}
                onChange={(e) =>
                  setPlaylist({ ...playlist, title: e.target.value })
                }
                placeholder="Nome da Playlist"
                style={inputStyles}
              />
            </div>
            <div style={inputContainerStyles}>
              <label style={inputLabelStyles}>Descrição</label>
              <textarea
                value={playlist.describe}
                onChange={(e) =>
                  setPlaylist({ ...playlist, describe: e.target.value })
                }
                placeholder="Descrição"
                style={textAreaStyles}
              />
            </div>
            <div style={buttonContainerStyles}>
              <button type="submit" style={buttonStyles}>
                Criar Playlist
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlaylistModal;
