import NavigationBar from "../NavigationBar/NavigationBar";
import CardUserProfile from "../CardUserProfile/CardUserProfile";
import { Artist } from "@/app/types/artist.type";
import ArtistCarouselUserPage from "../ArtistCarouselUserPage/ArtistCarouselUserPage";
import PlaylistCarouselUserPage from "../PlaylistCarouselUserPage/PlaylistCarouselUserPage";
import { mockPlaylist } from "@/app/mocks/playlists";
import { mockArtists } from "@/app/mocks/artists";

import MusicsCarouselUserPage from "../MusicsCarouselUserPage/MusicsCarouselUserPage";
import { useMusicPlayer } from "@/app/hooks/useMusicPlayer";
import {  PlaylistSimple } from "@/app/types/playlist.type";

interface IPerfilUsuario {
  artist: Artist;
}

const UserProfilePage = ({ artist }: IPerfilUsuario) => {
  const { musicPlayer } = useMusicPlayer();
  return (
    <div className="container-fluid d-flex " style={{ overflow: "hidden" }}>
      <div
        className="col overflow-auto"
        style={{ maxHeight: `${musicPlayer.songs.length ? "85vh" : "90vh"}` }}
      >
        <h4 className="fw-normal text-info-emphasis">Seu Perfil</h4>
        <p className="fw-light">Suas informações estão aqui :)</p>

        <div className="col">
          <CardUserProfile artist={artist} />
          <hr></hr>
          <ArtistCarouselUserPage artistas={mockArtists} />
          <hr></hr>
          <PlaylistCarouselUserPage playlists={[]} />
          <hr></hr>
          <MusicsCarouselUserPage />
        </div>
      </div>
    </div>
  );
};

// <PlaylistProfiler playlists={mockPlaylist} />
export default UserProfilePage;
