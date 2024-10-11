import React from "react";
import Image from "next/image";
import { Artist } from "@/app/types/artist.type";

interface CardArtistsProps {
  artista: Artist;
}

const CardCarousel = ({ artista }: CardArtistsProps) => {
  return (
    <div className="col text-center d-flex flex-column align-items-center">
      <div
        className="card rounded-circle"
        style={{ width: "200px", height: "200px" }}
      >
        <div className="card-body">
          <Image
            src={artista.picture.src}
            alt={artista.picture.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-circle"
          />
        </div>
      </div>
      <p className="fw-light">{artista.name}</p>
    </div>
  );
};

export default CardCarousel;
