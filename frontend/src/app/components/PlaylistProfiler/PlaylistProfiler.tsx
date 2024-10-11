"use client";

import React from "react";
import CardPlaylist from "../CardPlaylist/CardPlaylist";
import { Playlist, PlaylistSimple } from "@/app/types/playlist.type";
import { usePlaylist } from "@/app/hooks/usePlaylist";

interface IListagemPlaylists {
  playlists: PlaylistSimple[];
}
const MAX_DISPLAY_SAVED = 4;
const MAX_DISPLAY_RECOMEND = 4;

const PlaylistProfiler = ({ playlists }: IListagemPlaylists) => {
  const playlistsRecomended = playlists.slice(0, MAX_DISPLAY_RECOMEND);
  const { playlists: data } = usePlaylist();
  const savedPlaylists = data.slice(0, MAX_DISPLAY_SAVED);

  return (
    <div>
      <h4 className="fw-normal text-info-emphasis">Playlists Recomendadas</h4>
      <p className="fw-light">Suas Playlists :)</p>
      <div className="d-flex flex-wrap ">
        {savedPlaylists.map((playlist) => (
          <div key={playlist.id} className="col-3 ">
            <CardPlaylist playlist={playlist} />
          </div>
        ))}
      </div>
      <p className="fw-light">Recomendações baseadas em seu gosto musical :)</p>
      <div className="d-flex flex-wrap ">
        {playlistsRecomended.map((playlist) => (
          <div key={playlist.id} className="col-3 ">
            <CardPlaylist playlist={playlist} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistProfiler;
