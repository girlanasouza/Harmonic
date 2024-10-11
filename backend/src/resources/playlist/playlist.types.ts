import { Playlist, PlaylistSongs } from "@prisma/client";
import { ISongMetadata } from "../music/music.types";

export type IPlaylistDTO = Pick<Playlist, "title" | "url_cover" | "describe">;

export type TSongPlaylistDTO = Pick<PlaylistSongs, "musicId" | "playlistId">;

export type TResponseSimplified = {
  id: string;
  title: string;
  describe?: string;
  url_cover?: string;
  length: number;
  total_time: number;
};

export type TResponse = {
  id: string;
  title: string;
  describe?: string;
  url_cover?: string;
  songs: ISongMetadata[];
  length: number;
  total_time: number;
};
