import NavigationBar from "../NavigationBar/NavigationBar";
import { PlaylistDetails } from "../PlaylistDetails/PlaylistDetails";
import { BodyWrapper } from "../SearchPage/styles";
import SearchMusicDirectory from "../SearchMusicDirectory/SearchMusicDirectory";
import { useParams } from "next/navigation";
import { PlaylistFull } from "@/app/types/playlist.type";
import { usePlaylistFull } from "@/app/hooks/usePlaylists";
import { useRef } from "react";
import { Menu } from "primereact/menu";
import { CellItem } from "../PlaylistListingPage/style";

const PlaylistDetailsPage = () => {
  const { playlistId } = useParams();
  const menuRef = useRef<Menu>(null);
  const { playlistFull } = usePlaylistFull(playlistId as string);

  const playlist = playlistFull as PlaylistFull;

  return (
    <div className="m-2 d-flex" style={{ overflow: "hidden" }}>
      {/* <div className="d-flex col-1 justify-content-start align-items-start    h-100">
        <NavigationBar />
      </div> */}

      <div className="d-flex col w-100 h-100 overflow-auto">
        <div className="col-11 rounded-2">
          <PlaylistDetails playlist={playlist} />
          <div
            className="d-flex border-black border-bottom py-2"
            style={{ maxWidth: "80vw", marginBottom: "12px" }}
          >
            <CellItem>Capa</CellItem>
            <CellItem>Música</CellItem>
            <CellItem>Álbum</CellItem>
            <CellItem>Artista</CellItem>
            <CellItem>Duração</CellItem>
            <CellItem></CellItem>
          </div>
          {playlist && (
            <SearchMusicDirectory
              songs={playlist.songs}
              playlistId={playlist.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetailsPage;
