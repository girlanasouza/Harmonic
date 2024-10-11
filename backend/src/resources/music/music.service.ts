import { PrismaClient } from "@prisma/client";
import path from "path";
import {
  ISearchMusic,
  ISongMetadata,
  ISongMetadataSearch,
} from "../music/music.types";

const prisma = new PrismaClient();

const getMusicById = async (id: string) => {
  try {
    const music = await prisma.music.findUnique({ where: { id } });

    if (!music) return music;

    const pathMusic = path.join(
      __dirname,
      "../../../",
      "musics/",
      music.url_music
    );

    return pathMusic;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getMusicMetadataById = async (
  musicId: string
): Promise<ISongMetadata | null> => {
  try {
    const music = await prisma.musicAlbum.findFirst({
      where: { musicId },
      include: {
        music: true,
        album: {
          include: {
            artistAlbum: {
              include: {
                artist: true,
              },
            },
          },
        },
      },
    });

    if (!music) return null;

    const artists = music.album?.artistAlbum;

    let artist_to_response = { artistIds: "", artistsName: "", artistUrls: "" };

    if (artists) {
      const artistIds = artists.map((artist) => artist.artist.id).join(",");
      const artistsName = artists
        .map((artist) => artist.artist.name)
        .join(", ");

      const artistUrls = artists
        .map((artist) => artist.artist.image_url)
        .join("|");
      artist_to_response = {
        artistIds,
        artistsName,
        artistUrls,
      };
    }

    const metadataResponse: ISongMetadata = {
      id: music.musicId,
      title: music.music.title,
      duration: music.music.duration,
      url_music: music.music.url_music,
      year: music.music.year,
      explicit: music.music.explicit,
      song_type: music.music.song_type,
      album: {
        id: music.album?.id,
        name: music.album?.name,
        img_url: music.album?.image_url,
      },
      artist: {
        id: artist_to_response.artistIds,
        name: artist_to_response.artistsName,
        img_url: artist_to_response.artistUrls,
      },
    };

    return metadataResponse;
  } catch (error) {
    console.error("Error fetching music metadata:", error);
    return null;
  }
};

const searchMusic = async (
  query: ISearchMusic
): Promise<ISongMetadataSearch[]> => {
  try {
    if (!query.query.length) return [];

    const musics: ISongMetadataSearch[] = [];

    const response = await prisma.searchable.findMany({
      where: {
        search_field: {
          contains: query.query || "",
          mode: "insensitive",
        },
      },
      take: 10,
    });

    response.map(async (music) => {
      const metadataResponse: ISongMetadataSearch = {
        id: music.song_id,
        title: music.song_title,
        duration: music.song_duration,
        explicit: music.song_explicit,
        song_type: music.song_type || "",
        album: {
          id: music.album_id || "",
          name: music.album_name || "",
          img_url: music.album_img_url || "",
        },
        artist: {
          id: music.artist_id || "",
          name: music.artist_name || "",
          img_url: music.artist_img_url || "",
        },
      };

      musics.push(metadataResponse);
    });

    return musics;
  } catch (error) {
    console.error("Error searching music:", error);
    throw error;
  }
};

export default { getMusicById, getMusicMetadataById, searchMusic };
