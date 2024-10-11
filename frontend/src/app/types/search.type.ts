type Artist = {
  id: string;
  name: string;
  img_url: string;
};

type Album = {
  id: string;
  name: string;
  img_url: string;
};

export type SongAPI = {
  id: string;
  title: string;
  duration: number;
  url_music: string;
  year: string;
  song_type: string;
  explicit: Boolean;
  album: Album;
  artist: Artist;
};
