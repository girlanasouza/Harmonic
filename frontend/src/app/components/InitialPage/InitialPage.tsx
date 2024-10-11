"use client";

import PlaylistProfiler from "../PlaylistProfiler/PlaylistProfiler";
import ArtistDirectory from "../ArtistDirectory/ArtistDirectory";
import { mockArtists } from "@/app/mocks/artists";
import { useEffect, useState } from "react";
import { PlaylistSimple } from "@/app/types/playlist.type";
import { getPlaylistsRecommend } from "@/app/service/playlist";

const InitialPage = () => {
  const [recommendPlaylist, setRecommendPlaylist] = useState<PlaylistSimple[]>(
    []
  );

  useEffect(() => {
    const getRecomendation = async () => {
      const playlists = await getPlaylistsRecommend();
      setRecommendPlaylist(playlists);
    };
    getRecomendation();
  }, []);

  return (
    <div className="container-fluid d-flex">
      <div className="col">
        <PlaylistProfiler playlists={recommendPlaylist} />
        <hr></hr>
        <ArtistDirectory artistas={mockArtists} />
      </div>
    </div>
  );
};

export default InitialPage;
