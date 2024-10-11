import api from "./api";

export const getMusicStreaming = async (idMusic: string) => {
  const response = await api.get(`/music/${idMusic}`, {
    responseType: "blob",
  });
  const title = response.headers["content-title"];
  const artist = response.headers["content-artist"];
  const url_img = response.headers["content-cover"];

  return { data: response.data, title, artist, url_img };
};

export const getMusicSearch = async (query: string) => {
  try {
    if (query.length >= 2) {
      const response = await api.post("/music/search", { query });
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};
