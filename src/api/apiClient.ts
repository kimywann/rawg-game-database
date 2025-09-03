import axios from "axios";

const API_BASE_URL = "https://api.rawg.io/api";
const API_KEY = process.env.RAWG_API_KEY;

if (!API_KEY) {
  throw new Error("RAWG API key is not defined in environment variables.");
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  params: {
    key: API_KEY,
  },
});
