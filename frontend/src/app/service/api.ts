import axios from "axios";

const ssl = parseInt(process.env.NEXT_PUBLIC_SSL || "0");
const address = process.env.NEXT_PUBLIC_API_URL;
const port = process.env.NEXT_PUBLIC_PORT;
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const api = axios.create({
  baseURL: `${ssl ? "https://" : "http://"}${address}:${port}/api/v1`,
  withCredentials: true,
  httpsAgent: agent,
});

export default api;
