import * as React from "react";
import { mockArtists } from "@/app/mocks/artists";
import CardMusicProfile from "../CardMusicProfile/CardMusicProfile";

const MusicsCarouselUserPage = () => {
  const limitedPlaylists = mockArtists.slice(0, 5);
  return (
    <>
      <div className="">
        <h4 className="fw-normal text-info-emphasis">Músicas Favoritas </h4>
        <p className="fw-light">Visíveis apenas para você</p>

        {limitedPlaylists.map((playlist) => (
          <div className="p-2" key={playlist.name}>
            <CardMusicProfile artista={playlist} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MusicsCarouselUserPage;
