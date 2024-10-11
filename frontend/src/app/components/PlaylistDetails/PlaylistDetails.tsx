import { PlaylistFull } from "@/app/types/playlist.type";
import { WrapperPlaylistDatails, Infos } from "./style";
import { formatDuration } from "@/app/utils/formatDuration";
import Image from "next/image";
import { StyledMenu } from "../PlaylistMenu/style";
import { Button, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import { useMusicPlayer } from "@/app/hooks/useMusicPlayer";
import { Song } from "@/app/state/playerProvider";
import { useMusicStreaming } from "@/app/hooks/useMusicStreaming";
import { SongAPI } from "@/app/types/search.type";

export type TPlaylistDetails = {
  playlist: PlaylistFull;
};

export const PlaylistDetails = ({ playlist }: TPlaylistDetails) => {
  const menuRef = useRef<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const musicIds = (songs: SongAPI[]) => {
    if (songs) {
      return songs.map((item) => item.id);
    } else {
      return [];
    }
  };

  const { songs } = useMusicStreaming(musicIds(playlist.songs));

  const { setMusicPlayer } = useMusicPlayer();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true);
    menuRef.current = event.currentTarget;
  };

  const handleClose = () => {
    setOpen(false);
    menuRef.current = null;
  };

  const playPlaylist = () => {
    const musics: Song[] = playlist?.songs.map((music) => {
      const song = songs.find((item) => item.title === music.title);
      return {
        name: music.artist.name,
        src: song ? song.url : "",
        title: music.title,
        artist: music.artist.name,
        img_url: music.album.img_url,
      };
    });

    setMusicPlayer({
      songs: musics,
      currentIndex: 0,
      isPlaying: true,
    });
  };

  let randomIndex = 0;

  if (playlist.songs) {
    randomIndex = Math.floor(Math.random() * playlist.songs.length);
  }

  return (
    <div>
      <WrapperPlaylistDatails>
        <Image
          src={
            playlist.songs
              ? playlist.songs[randomIndex].album.img_url
              : "https://cdn.pixabay.com/photo/2016/11/22/19/15/hand-1850120_1280.jpg"
          }
          alt="Playlist"
          width={500}
          height={200}
          className="rounded-4"
          style={{ width: "500px", height: "200px", objectFit: "contain" }}
        />
        <Infos>
          <div className="h1">{playlist.title}</div>
          <div>{playlist.describe}</div>
          <div>cerca de {formatDuration(playlist.total_time)}</div>
        </Infos>
      </WrapperPlaylistDatails>
      <div className="mt-2">
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          // aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          color="secondary"
          disableElevation
          onClick={playPlaylist}
        >
          <i className="text-black bi bi-play-circle-fill h2"></i>
        </Button>

        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          color="secondary"
          disableElevation
          onClick={handleClick}
        >
          <i className="text-black bi bi-three-dots-vertical h2"></i>
        </Button>

        <StyledMenu
          id="popup_menu_left"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={menuRef.current}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleClose}>
            <i className="text-primary bi bi-pen-fill"> Edit </i>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className=" text-danger bi bi-trash-fill"> Delete </i>
          </MenuItem>
        </StyledMenu>
      </div>
    </div>
  );
};
