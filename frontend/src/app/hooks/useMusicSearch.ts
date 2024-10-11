import { useQuery } from "react-query";
import { getMusicSearch } from "../service/music";

export const useMusicSearch = (query: string) => {
  const { data, isLoading, isError } = useQuery(
    ["musicSearch", query],
    () => getMusicSearch(query),
    {
      enabled: !!query,
    }
  );

  if (data) {
    return { songs: data, isLoading, isError };
  } else {
    return { songs: [], isLoading, isError };
  }
};
