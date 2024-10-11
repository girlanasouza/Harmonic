import { PrismaClient } from "@prisma/client";
import {
  IPlaylistDTO,
  TResponse,
  TResponseSimplified,
  TSongPlaylistDTO,
} from "./playlist.types";
import { ISongMetadata } from "../music/music.types";
const prisma = new PrismaClient();

const create = async (playlist: IPlaylistDTO, userId: string) => {
  const newPlaylist = await prisma.playlist.create({
    data: { ...playlist, userId },
  });

  return newPlaylist;
};

const remove = async (idPlaylist: string) => {
  await prisma.playlistSongs.deleteMany({
    where: {
      playlistId: idPlaylist,
    },
  });

  const playlist = await prisma.playlist.delete({
    where: {
      id: idPlaylist,
    },
    include: {
      playlistSongs: true,
    },
  });

  return playlist;
};

const update = async (idPlaylist: string, playlist: IPlaylistDTO) => {
  const playlistUpdated = await prisma.playlist.update({
    where: {
      id: idPlaylist,
    },
    data: {
      ...playlist,
    },
  });

  return playlistUpdated;
};

const readUniqueComplete = async (idPlaylist: string) => {
  const playlist = await prisma.playlist.findUnique({
    where: {
      id: idPlaylist,
    },
    include: {
      playlistSongs: {
        select: {
          music: {
            select: {
              id: true,
              title: true,
              duration: true,
              url_music: true,
              year: true,
              explicit: true,
              song_type: true,
              musicAlbum: {
                select: {
                  album: {
                    select: {
                      artistAlbum: {
                        select: {
                          artist: true,
                        },
                      },
                      id: true,
                      name: true,
                      image_url: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!playlist) return [];

  const musics: ISongMetadata[] = [];

  playlist?.playlistSongs.map(async (music) => {
    const album = music?.music?.musicAlbum[0]?.album;

    let artist_to_response = { artistIds: "", artistsName: "", artistUrls: "" };

    try {
      if (album.artistAlbum) {
        const artistIds = album.artistAlbum
          .map((artist) => artist.artist.id)
          .join(",");

        const artistsName = album.artistAlbum
          .map((artist) => artist.artist.name)
          .join(", ");
        const artistUrls = album.artistAlbum
          .map((artist) => artist.artist.image_url)
          .join("|");

        artist_to_response = {
          artistIds,
          artistsName,
          artistUrls,
        };
      }
    } catch {
      artist_to_response = { artistIds: "", artistsName: "", artistUrls: "" };
    }

    try {
      musics.push({
        id: music.music.id,
        title: music.music.title,
        duration: music.music.duration,
        url_music: music.music.url_music,
        year: music.music.year,
        song_type: music.music.song_type,
        explicit: music.music.explicit,
        album: {
          id: album.id,
          name: album.name,
          img_url: album.image_url,
        },
        artist: {
          id: artist_to_response.artistIds,
          name: artist_to_response.artistsName,
          img_url: artist_to_response.artistUrls,
        },
      });
    } catch {
      console.log("error in music", music.music.id);
    }
  });

  const response: TResponse = {
    id: playlist?.id,
    title: playlist?.title,
    describe: playlist?.describe || "",
    length: musics.length,
    url_cover: playlist?.url_cover || "",
    total_time: playlist?.playlistSongs.reduce(
      (acc, music) => acc + Number(music.music.duration),
      0
    ),
    songs: musics,
  };

  return response;
};

const readUniqueSimplified = async (idPlaylist: string) => {
  const playlist = await prisma.playlist.findUnique({
    where: {
      id: idPlaylist,
    },
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

  if (!playlist) return [];

  const response: TResponseSimplified = {
    id: playlist?.id,
    title: playlist?.title,
    describe: playlist?.describe || "",
    length: playlist.playlistSongs.length,
    url_cover: playlist?.url_cover || "",
    total_time: playlist?.playlistSongs.reduce(
      (acc, music) => acc + Number(music.music.duration),
      0
    ),
  };

  return response;
};

const readUnique = async (idPlaylist: string, isSimplified: boolean) => {
  if (!isSimplified) return readUniqueComplete(idPlaylist);
  else return readUniqueSimplified(idPlaylist);
};

const readMany = async (userId: string): Promise<TResponseSimplified[]> => {
  const response: TResponseSimplified[] = [];
  const playlists = await prisma.playlist.findMany({
    where: { userId, is_active: true, is_recomendation: false },
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

const insertMusicInPlaylist = async (musicPlaylist: TSongPlaylistDTO) => {
  const musicInsert = await prisma.playlistSongs.create({
    data: {
      ...musicPlaylist,
    },
    include: {
      music: true,
    },
  });

  const playlist = await prisma.playlist.findUnique({
    where: { id: musicPlaylist.playlistId },
    include: {
      playlistSongs: {
        include: {
          music: {
            include: {
              musicAlbum: {
                include: {
                  album: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (playlist) {
    const firstSong = playlist.playlistSongs[0];
    const albumCoverUrl = firstSong.music.musicAlbum[0]?.album?.image_url;

    await prisma.playlist.update({
      where: { id: musicPlaylist.playlistId },
      data: { url_cover: albumCoverUrl },
    });
  }

  return musicInsert;
};

const removeMusicInPlaylist = async (musicPlaylist: TSongPlaylistDTO) => {
  const musicRemoved = await prisma.playlistSongs.delete({
    where: {
      playlistId_musicId: {
        ...musicPlaylist,
      },
    },
  });

  return musicRemoved;
};

export default {
  create,
  readUnique,
  readMany,
  update,
  remove,
  insertMusicInPlaylist,
  removeMusicInPlaylist,
};
