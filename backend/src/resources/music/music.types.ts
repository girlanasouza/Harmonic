import { Music } from "@prisma/client";

export interface ISongMetadata
  extends Pick<
    Music,
    | "id"
    | "title"
    | "duration"
    | "url_music"
    | "year"
    | "explicit"
    | "song_type"
  > {
  album: {
    id?: string;
    name?: string;
    img_url?: string;
  };
  artist: {
    id?: string;
    name?: string;
    img_url?: string;
  };
}

export interface ISongMetadataSearch
  extends Pick<Music, "id" | "title" | "duration" | "explicit" | "song_type"> {
  album: {
    id?: string;
    name?: string;
    img_url?: string;
  };
  artist: {
    id?: string;
    name?: string;
    img_url?: string;
  };
}

export interface ISearchMusic {
  query: string;
}
