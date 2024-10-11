import CardPlaylist from "../CardPlaylist/CardPlaylist";

import React from "react";
import { Carousel } from "react-bootstrap";
import { Playlist, PlaylistSimple } from "@/app/types/playlist.type";

interface IListagemPlaylists {
  playlists: PlaylistSimple[];
}

const PlaylistCarouselUserPage = ({ playlists }: IListagemPlaylists) => {
  const limitedPlaylists = playlists.slice(0, 5);
  return (
    <>
      <div className="">
        <h4 className="fw-normal text-info-emphasis">Playlists Favoritas </h4>
        <p className="fw-light">Visíveis apenas para você</p>
        <div className="d-flex justify-content-between">
          {limitedPlaylists.map((playlist) => (
            <div className="col p-2" key={playlist.title}>
              <CardPlaylist playlist={playlist} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlaylistCarouselUserPage;
