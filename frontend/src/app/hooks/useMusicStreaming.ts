import { useQuery } from "react-query";
import { getMusicStreaming } from "../service/music";

export const useMusicStreaming = (idMusic: string[]) => {
  const { data, isLoading, isError } = useQuery(
    ["musicStreaming", idMusic],
    () => Promise.all(idMusic.map((id) => getMusicStreaming(id))),
    {
      enabled: !!idMusic,
    }
  );

  if (data) {
    const songs = data.map((result) => ({
      url: URL.createObjectURL(result.data),
      title: result.title,
      artist: result.artist,
      url_img: result.url_img,
    }));
    return { songs, isLoading, isError };
  } else {
    return { songs: [], isLoading, isError };
  }
};
