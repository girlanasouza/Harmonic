import { useMusicPlayer } from "@/app/hooks/useMusicPlayer";
import SearchMusic from "../SearchMusic/SearchMusic";
import { SongAPI } from "@/app/types/search.type";
import PlaylistMusic from "../PlaylistMusic/PlaylistMusic";

interface IListagemArtistas {
  playlistId?: string;
  songs: SongAPI[];
}

const SearchMusicDirectory = ({ songs, playlistId }: IListagemArtistas) => {
  const { musicPlayer } = useMusicPlayer();

  return (
    <div id="artist-directory">
      {songs && !playlistId ? (
        <div
          data-bs-spy="scroll"
          data-bs-smooth-scroll="true"
          className="scrollspy-example"
          tabIndex={0}
          style={{
            maxHeight: musicPlayer.songs.length
              ? "calc(100vh * 0.65)"
              : "calc(100vh * 0.75)",
            overflowY: "auto",
          }}
        >
          {songs.map((song) => (
            <SearchMusic key={song.title} song={song} />
          ))}
        </div>
      ) : songs && playlistId ? (
        <div
          data-bs-spy="scroll"
          data-bs-target="#list-music"
          data-bs-smooth-scroll="true"
          className="scrollspy-a"
          tabIndex={0}
          style={{
            maxHeight: musicPlayer.songs.length
              ? "calc(100vh * 0.35)"
              : "calc(100vh * 0.75)",
            overflowY: "auto",
          }}
        >
          {songs.map((song) => (
            <PlaylistMusic
              key={song.title}
              song={song}
              playlistId={playlistId}
            />
          ))}
        </div>
      ) : (
        <h3>Nenhum resultado para mostrar...</h3>
      )}
    </div>
  );
};

export default SearchMusicDirectory;
