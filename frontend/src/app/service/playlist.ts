import {
  PlaylistCreate,
  PlaylistCreateResponse,
  PlaylistDelete,
  PlaylistFull,
  PlaylistRemoveMusicResponse,
  PlaylistSimple,
  PlaylistUpdate,
  PlaylistUpdateResponse,
} from "../types/playlist.type";
import api from "./api";

export const getPlaylists = async (): Promise<PlaylistSimple[]> => {
  try {
    const response = await api.get("/playlist");
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getPlaylistsRecommend = async (): Promise<PlaylistSimple[]> => {
  try {
    const response = await api.get("/recommedations/playlists");
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getPlaylistFull = async (
  playlistId: string
): Promise<PlaylistFull> => {
  try {
    const response = await api.get(`/playlist/${playlistId}`);
    return response.data as PlaylistFull;
  } catch (error) {
    throw error;
  }
};

export const createPlaylist = async (
  playlist: PlaylistCreate
): Promise<PlaylistCreateResponse> => {
  try {
    const { data } = await api.post("/playlist", playlist);
    return data;
  } catch (error) {
    throw error;
  }
};

export const addMusicToPlaylist = async (
  playlistId: string,
  musicId: string
): Promise<PlaylistCreateResponse> => {
  try {
    const { data } = await api.post(`/playlist/${playlistId}/${musicId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const removeMusicToPlaylist = async (
  playlistId: string,
  musicId: string
): Promise<PlaylistRemoveMusicResponse> => {
  try {
    const { data } = await api.delete(`/playlist/${playlistId}/${musicId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deletePlaylist = async (
  playlistId: string
): Promise<PlaylistDelete> => {
  try {
    const { data } = await api.delete(`/playlist/${playlistId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updatePlaylist = async (
  playlistId: string,
  playlistUpdate: PlaylistUpdate
): Promise<PlaylistUpdateResponse> => {
  try {
    const { data } = await api.put(`/playlist/${playlistId}`, playlistUpdate);
    return data;
  } catch (error) {
    throw error;
  }
};
