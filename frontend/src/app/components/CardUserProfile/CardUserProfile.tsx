import { Artist } from "@/app/types/artist.type";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useAuthUser } from "@/app/hooks/useUserAuth";

interface CardArtistProps {
  artist: Artist;
}

const CardArtistProfile = ({ artist }: CardArtistProps) => {
  const { UserAuth, logout } = useAuthUser();

  return (
    <div className="d-flex align-items-center">
      <div
        className="card bg-primary border-0 rounded-circle overflow-hidden"
        style={{ width: "280px", height: "280px" }}
      >
        <Image
          src={
            UserAuth?.url_img_profile.length
              ? UserAuth?.url_img_profile
              : "https://cdn.pixabay.com/photo/2016/04/10/18/44/flamingo-1320475_1280.jpg"
          }
          alt="Playlist"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-circle"
        />
      </div>
      <div>
        <Typography
          variant="h3"
          className="text-primary-emphasis font-monospace fw-bold m-2"
        >
          {UserAuth?.name}
        </Typography>
      </div>
    </div>
  );
};

export default CardArtistProfile;
