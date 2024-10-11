import Image from "next/image";
import { Artist } from "@/app/types/artist.type";
import Typography from "@mui/material/Typography";

interface CardArtistProps {
  artist: Artist;
}

const CardArtistProfile = ({ artist }: CardArtistProps) => {
  return (
    <div className=" d-flex align-items-center ">
      <Image
        src={
          "https://cdn.pixabay.com/photo/2016/04/10/18/44/flamingo-1320475_1280.jpg"
        }
        alt={artist.picture.title}
        width={254}
        height={250}
        className="rounded-3"
        // fill
        // style={{ width: "100%" }}
      />
      <Typography
        variant="h5"
        className="card-title text-primary-emphasis font-monospace fw-bold m-2"
      >
        <p>Artista</p>
        Shrek dos Santos
      </Typography>
    </div>
  );
};

export default CardArtistProfile;
