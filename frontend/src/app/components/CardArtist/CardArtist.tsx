import React from "react";
import Image from "next/image";
import { Artist } from "@/app/types/artist.type";
import Link from "next/link";

interface CardArtistsProps {
  artista: Artist;
}

const CardArtist = ({ artista }: CardArtistsProps) => {
  return (
    <div className="col text-center d-flex flex-column align-items-center">
      <div
        className="card bg-primary border-0 rounded-circle overflow-hidden"
        style={{ width: "250px", height: "250px" }}
      >
        <div className="card-body p-0">
          <Image
            src={artista.picture.src}
            alt={artista.picture.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-circle"
          />
        </div>
      </div>
      <p className="fw-normal">{artista.name}</p>
    </div>
  );
};

export default CardArtist;
