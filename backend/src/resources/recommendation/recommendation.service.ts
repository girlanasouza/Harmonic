import { PrismaClient } from "@prisma/client";
import { TResponseSimplified } from "../playlist/playlist.types";
import { Artist, ArtistsRecommend } from "./recommendation.types";

const prisma = new PrismaClient();

const playlistRecomendation = async (
  userId: string
): Promise<TResponseSimplified[]> => {
  const response: TResponseSimplified[] = [];
  const playlists = await prisma.playlist.findMany({
    where: { userId, is_active: true, is_recomendation: true },
    include: {
      playlistSongs: {
        include: {
          music: {
            select: {
              duration: true,
            },
          },
        },
      },
    },
  });

  playlists.map((item) => {
    response.push({
      id: item.id,
      title: item.title,
      describe: item.describe ?? undefined,
      url_cover: item.url_cover ?? undefined,
      length: item.playlistSongs.length,
      total_time: item.playlistSongs.reduce(
        (acc: number, music) => acc + Number(music.music.duration),
        0
      ),
    });
  });

  return response;
};



const artistsRecommend = async (
  userId: string
) => {

  const artists: Artist[] = []

  const records: ArtistsRecommend[] = await prisma.$queryRaw`SELECT * FROM get_top_artists(${userId})`;
  
  records.map( (art) => {
    artists.push({id: art.id_top, name: art.name_top, image_url: art.image_url_top})
  });

  return artists;

}



export default { playlistRecomendation, artistsRecommend };
