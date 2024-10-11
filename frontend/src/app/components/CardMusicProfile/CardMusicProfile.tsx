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
import { Artist } from "@/app/types/artist.type";

interface CardArtistsProps {
  artista: Artist;
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

const CardMusicProfile = ({ artista }: CardArtistsProps) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-1">
            <Image
              src={artista.picture.src}
              alt="Artist"
              width={200}
              height={200}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="col-1">
            <p className="fw-light">Music</p>
          </div>

          <div className="col text-center">
            <p className="fw-light">Artist</p>
          </div>

          <div className="col-4 text-center">
            <p className="fw-light">Album</p>
          </div>
          <div className="col-2 text-end fw-light">3:30</div>
        </div>
      </div>
    </>
  );
};

export default CardMusicProfile;
