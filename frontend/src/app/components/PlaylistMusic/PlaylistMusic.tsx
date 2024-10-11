import { useState, useRef } from "react";
import { useMusicPlayer } from "@/app/hooks/useMusicPlayer";
import { useMusicStreaming } from "@/app/hooks/useMusicStreaming";
import { SongAPI } from "@/app/types/search.type";
import Image from "next/image";
import { formatDuration } from "@/app/utils/formatDuration";
import { removeMusicToPlaylist } from "@/app/service/playlist";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { CellItemWithoutBold } from "../CardPlaylistListing/style";
import { StyledMenu } from "../PlaylistMenu/style";
import { IconButton, MenuItem, Tooltip } from "@mui/material";
import * as React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

interface CardArtistsProps {
  song: SongAPI;
  playlistId: string;
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

const PlaylistMusic = ({ song, playlistId }: CardArtistsProps) => {
  const { setMusicPlayer } = useMusicPlayer();
  const [deleted, setDeleted] = useState<Boolean>(false);
  const { songs } = useMusicStreaming([song.id]);

  const handleClick = () => {
    setMusicPlayer((prev) => ({
      ...prev,
      songs: [
        {
          name: song.album.name,
          src: songs[0].url,
          title: song.title,
          artist: song.artist.name,
          img_url: song.album.img_url,
        },
      ],
    }));
    return null;
  };

  const menuRef = React.useRef<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true);
    menuRef.current = event.currentTarget;
  };

  const handleClose = () => {
    setOpen(false);
    menuRef.current = null;
  };
  const handleClickRemovetoPlaylist = async () => {
    try {
      await removeMusicToPlaylist(playlistId, song.id);
      setDeleted(true);
      toast.success("Success!!");
    } catch (err) {
      console.log(err);
      toast.error("An unexpected error occurred!!");
    }
  };

  if (deleted) return null;

  return (
    <>
      <div className="d-flex" style={{ maxWidth: "80vw" }}>
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
              alt="Artist"
              width={200}
              height={200}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          </div>
        </CellItemWithoutBold>

        <Row>{song.title}</Row>
        <Row>{song.album.name}</Row>
        <Row>{song.artist.name}</Row>
        <Row>{formatDuration(song.duration)}</Row>
        <Row>
          <Tooltip title="Remover ">
            <IconButton onClick={handleClickRemovetoPlaylist}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </Row>
      </div>
      <hr></hr>
      <StyledMenu
        id="popup_menu_left"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={menuRef.current}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClickRemovetoPlaylist}>
          <i className="text-danger bi bi-trash-fill">Remover</i>
        </MenuItem>
      </StyledMenu>
    </>
  );
};

export default PlaylistMusic;
