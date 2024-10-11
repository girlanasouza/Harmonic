import { useQuery } from "react-query";
import {
  addMusicToPlaylist,
  createPlaylist,
  deletePlaylist,
  getPlaylistFull,
  getPlaylists,
  removeMusicToPlaylist,
  updatePlaylist,
} from "../service/playlist";
import { PlaylistCreate, PlaylistUpdate } from "../types/playlist.type";

export const usePlaylists = () => {
  const { data, isLoading, isError, refetch } = useQuery(["playlists"], () =>
    getPlaylists()
  );

  if (data) {
    return { playlists: data, isLoading, isError, refetch };
  } else {
    return { playlists: [], isLoading, isError, refetch };
  }
};

export const usePlaylistFull = (playlistId: string) => {
  const { data, isLoading, isError } = useQuery(
    ["playlistFull", playlistId],
    () => getPlaylistFull(playlistId),
    {
      enabled: playlistId.length > 3,
    }
  );

  if (data) {
    return { playlistFull: data, isLoading, isError };
  } else {
    return { playlistFull: [], isLoading, isError };
  }
};

export const usePlaylistDelete = (playlistId: string) => {
  const { data, isLoading, isError } = useQuery(
    ["deletePlaylist", `Delete_${playlistId}`],
    () => deletePlaylist(playlistId),
    {
      enabled: playlistId.length > 3,
    }
  );

  if (data) {
    return { playlistDeleted: data, isLoading, isError };
  } else {
    return { playlistDeleted: null, isLoading, isError };
  }
};

export const useCreatePlaylist = (playlist: PlaylistCreate) => {
  const { data, isLoading, isError } = useQuery(
    ["createPlaylist", `CREATE_${playlist.title}`],
    () => createPlaylist(playlist),
    {
      enabled: playlist.title.length > 3 && playlist.describe.length > 3,
    }
  );

  if (data) {
    return { playlist: data, isLoading, isError };
  } else {
    return { playlist: null, isLoading, isError };
  }
};

export const useUpdatePlaylist = (
  playlistId: string,
  playlist: PlaylistUpdate
) => {
  const { data, isLoading, isError } = useQuery(
    ["updatePlaylist", `UPDATE_${playlist.title}`],
    () => updatePlaylist(playlistId, playlist),
    {
      enabled: playlist.title.length > 3 && playlist.describe.length > 0,
    }
  );

  if (data) {
    return { updatedPlaylist: data, isLoading, isError };
  } else {
    return { updatedPlaylist: null, isLoading, isError };
  }
};

export const usePlaylistAddMusic = (musicId: string, playlistId: string) => {
  const { data, isLoading, isError } = useQuery(
    ["addMusicToPlaylist", `AddToPlaylist_${musicId}_${playlistId}`],
    () => addMusicToPlaylist(playlistId, musicId),
    {
      enabled: musicId.length > 0 && playlistId.length > 0,
    }
  );

  if (data) {
    return { response: data, isLoading, isError };
  } else {
    return { response: null, isLoading, isError };
  }
};

export const usePlaylistRemoveMusic = (musicId: string, playlistId: string) => {
  const { data, isLoading, isError } = useQuery(
    ["RemoveMusicToPlaylist", `RemoveToPlaylist_${musicId}_${playlistId}`],
    () => removeMusicToPlaylist(playlistId, musicId),
    {
      enabled: musicId.length > 0 && playlistId.length > 0,
    }
  );

  if (data) {
    return { response: data, isLoading, isError };
  } else {
    return { response: null, isLoading, isError };
  }
};
