import { Artist } from "@/app/types/artist.type";
import NavigationBar from "../NavigationBar/NavigationBar";
import MusicsCarouselUserPage from "../MusicsCarouselUserPage/MusicsCarouselUserPage";
import MusicsArtistPage from "../MusicsArtistPage/MusicsArtistPage";
import CardArtistProfile from "../CardArtistProfile/CardArtistProfile";

interface IPerfilUsuario {
  artist: Artist;
}

const ArtistPage = ({ artist }: IPerfilUsuario) => {
  return (
    <>
      <div
        className="container-fluid d-flex  w-100 vh-100"
        style={{ overflow: "hidden" }}
      >
        <div className="col h-100 overflow-auto">
          <div className="col">
            <CardArtistProfile artist={artist} />
            <hr></hr>

            <MusicsArtistPage />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistPage;
