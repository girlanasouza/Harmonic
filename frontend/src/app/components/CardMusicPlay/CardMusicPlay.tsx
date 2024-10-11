"use client";

import Image from "next/image";

type CardMusicPlayProps = {
  title: string;
  artist: string;
  img_url: string;
};

const CardMusicPlay = ({ title, artist, img_url }: CardMusicPlayProps) => {
  return (
    <div className="d-flex flex-row">
      <Image
        src={img_url}
        alt={title}
        width={50}
        height={60}
        style={{ objectFit: "cover" }}
      />
      <div className=" px-3 py-1 gap-0 d-flex flex-column">
        <p className="fw-medium fs-6 m-1">{title}</p>
        <p className="fs-6 m-1">{artist}</p>
      </div>
    </div>
  );
};

export default CardMusicPlay;
