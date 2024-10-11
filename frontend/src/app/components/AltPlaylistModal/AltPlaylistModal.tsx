import React from "react";
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
import { PlaylistSimple } from "@/app/types/playlist.type";
import { updatePlaylist } from "@/app/service/playlist";

interface AddPlaylistModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  statePlaylist: [
    PlaylistSimple,
    React.Dispatch<React.SetStateAction<PlaylistSimple>>,
  ];
  optionsMenu?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AltPlaylistModal: React.FC<AddPlaylistModalProps> = ({
  isOpen,
  onClose,
  statePlaylist,
  optionsMenu,
}) => {
  const [playlis, setPlaylis] = statePlaylist;

  const handleUpdatePlaylist = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = await updatePlaylist(playlis.id, {
        title: playlis.title,
        describe: playlis.describe,
        url_cover: playlis.url_cover,
      });

      setPlaylis({ ...playlis, ...data });

      if (optionsMenu) optionsMenu(false);
    } catch (err) {
      console.log(err);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div id="modal-overlay" style={modalOverlayStyles}>
      <div style={modalContentStyles}>
        <button onClick={onClose} style={closeButtonStyles}>
          <i className="bi bi-x"></i>
        </button>
        <h5>Alterar Playlist</h5>
        <div style={formContainerStyles}>
          <div style={imageUploadContainerStyles}>
            <i className="bi bi-camera" style={{ fontSize: "2rem" }}></i>
          </div>
          <form style={formStyles}>
            <div style={inputContainerStyles}>
              <label style={inputLabelStyles}>Nome</label>
              <input
                type="text"
                value={playlis.title}
                onChange={(e) =>
                  setPlaylis({ ...playlis, title: e.target.value })
                }
                placeholder="Nome da Playlist"
                style={inputStyles}
              />
            </div>
            <div style={inputContainerStyles}>
              <label style={inputLabelStyles}>Descrição</label>
              <textarea
                value={playlis.describe}
                onChange={(e) =>
                  setPlaylis({ ...playlis, describe: e.target.value })
                }
                placeholder="Descrição"
                style={textAreaStyles}
              />
            </div>
            <div style={buttonContainerStyles}>
              <button style={buttonStyles} onClick={handleUpdatePlaylist}>
                Alterar Playlist
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AltPlaylistModal;
