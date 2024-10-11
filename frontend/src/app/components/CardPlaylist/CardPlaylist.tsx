"use client";
import React from "react";
import Image from "next/image";
import { Playlist, PlaylistSimple } from "@/app/types/playlist.type";
import { useRouter } from "next/navigation";

interface CardPlaylistProps {
  playlist: PlaylistSimple;
}

const CardPlaylist = ({ playlist }: CardPlaylistProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/playlists/details/${playlist.id}`);
  };

  return (
    <>
      <div
        className="text-center"
        onClick={handleClick}
        style={{ cursor: "pointer", padding: "2px" }}
      >
        <Image
          src={
            playlist.url_cover ||
            "https://cdn.pixabay.com/photo/2016/11/22/19/15/hand-1850120_1280.jpg"
          }
          alt={playlist.title}
          width={200}
          height={100}
          // style={{ objectFit: "cover" }}
          className="rounded-2"
        />
        <p className="text-center fw-light">{playlist.title}</p>
      </div>
    </>
  );
};

export default CardPlaylist;
