"use client";

import { CellItemWithoutBold } from "./style";
import Image from "next/image";
import PlaylistMenu from "../PlaylistMenu/PlaylistMenu";
import { PlaylistSimple } from "@/app/types/playlist.type";
import { formatDuration } from "@/app/utils/formatDuration";
import { useRouter } from "next/navigation";
interface CardPlaylistProps {
  playlist: PlaylistSimple;
}

const CardPlaylistListing = ({ playlist }: CardPlaylistProps) => {
  const router = useRouter();

  const handleDetailPlaylist = (playlistId: string) => {
    router.push(`/playlists/details/${playlistId}`);
  };

  return (
    <div className="mt-3">
      <div className="row g-0">
        <CellItemWithoutBold
          onClick={() => handleDetailPlaylist(playlist.id)}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={
              playlist.url_cover ||
              "https://cdn.pixabay.com/photo/2023/10/12/12/54/woman-8310743_1280.jpg"
            }
            alt={playlist.title}
            className="img-fluid rounded"
            width={200}
            height={200}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </CellItemWithoutBold>
        <CellItemWithoutBold>
          <div className="card-body d-flex justify-content-center">
            <p>{playlist.title}</p>
          </div>
        </CellItemWithoutBold>

        <CellItemWithoutBold>
          <div className="card-body d-flex justify-content-center">
            <p className="card-text fw-light">{playlist.length}</p>
          </div>
        </CellItemWithoutBold>
        <CellItemWithoutBold>
          <div className="card-body">
            <p className="card-title fw-light d-flex justify-content-center">
              {formatDuration(playlist.total_time)}
            </p>
          </div>
        </CellItemWithoutBold>
        <CellItemWithoutBold>
          <PlaylistMenu simplePlaylist={playlist} />
        </CellItemWithoutBold>
      </div>
      <hr />
    </div>
  );
};

export default CardPlaylistListing;
