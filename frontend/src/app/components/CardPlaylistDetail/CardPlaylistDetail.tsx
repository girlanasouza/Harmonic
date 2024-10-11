"use client";

import Image from "next/image";
import { SongAPI } from "@/app/types/search.type";

// usando Artista para n fazer mock de musica
interface CardMusicProps {
  music: SongAPI;
}

const CardPlaylistDetail = ({ music }: CardMusicProps) => {
  return (
    <div className="mb-3">
      <div className="row g-0">
        <div className="col ">
          <Image
            src={music.url_music}
            alt={music.title}
            className="img-fluid rounded-start"
            width={200}
            height={200}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
        <div className="col">
          <p className="fw-light">{music.title}</p>
        </div>
        <div className="col">
          <p className="fw-light">{music.title}</p>
        </div>
        <div className="col">
          <p className="fw-light">Artista</p>
        </div>
        <div className="col">
          <p className="fw-light">2:50</p>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CardPlaylistDetail;
