export interface Picture {
  title: string;
  src: string;
}

export interface Artist {
  name: string;
  picture: Picture;
}

export interface Artists {
  artists: Artist[];
}
