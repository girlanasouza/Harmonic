import React from "react";
import { Carousel } from "react-bootstrap";
import { Artist } from "@/app/types/artist.type";
import CardCarousel from "../CardCarousel/CardCarousel";

interface IListagemArtistas {
  artistas: Artist[];
}

const ArtistCarouselUserPage = ({ artistas }: IListagemArtistas) => {
  const groupedArtists = artistas.slice(0, 6);
  return (
    <>
      <div className="">
        <h4 className="fw-normal text-info-emphasis">Artistas Favoritos </h4>
        <p className="fw-light">Visíveis apenas para você</p>
        <div className="d-flex justify-content-between">
          {groupedArtists.map((artist) => (
            <div className="col" key={artist.name}>
              <CardCarousel artista={artist} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ArtistCarouselUserPage;
