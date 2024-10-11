import { SongAPI } from "./search.type";

export interface Picture {
  title: string;
  src: string;
}

export interface Playlist {
  name: string;
  picture: Picture;
}

export type PlaylistSimple = {
  id: string;
  title: string;
  describe: string;
  url_cover: string | null;
  length: number;
  total_time: number;
};

export type PlaylistFull = {
  id: string;
  title: string;
  describe: string;
  url_cover: string | null;
  songs: SongAPI[];
  length: number;
  total_time: number;
};

export type PlaylistCreate = Pick<
  PlaylistSimple,
  "title" | "describe" | "url_cover"
>;

export type PlaylistCreateResponse = Pick<
  PlaylistSimple,
  "id" | "title" | "describe" | "url_cover"
>;

export type PlaylistUpdate = Pick<
  PlaylistSimple,
  "title" | "describe" | "url_cover"
>;
export type PlaylistUpdateResponse = PlaylistCreateResponse;

export type PlaylistAddMusicResponse = {
  playlistId: string;
  musicId: string;
  music: SongAPI;
};

export type PlaylistRemoveMusicResponse = Pick<
  PlaylistAddMusicResponse,
  "playlistId" | "musicId"
>;

export type PlaylistDelete = PlaylistCreateResponse;
