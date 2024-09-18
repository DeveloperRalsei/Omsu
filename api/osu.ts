import ENV from "../src/ENV";
import axios from "axios";

const baseUrl = "https://osu.ppy.sh/api/v2";
let accessToken: string | null = null;
let tokenExpiryTime: number | null = null;

async function refreshToken() {
  const tokenResponse = await axios.post("https://osu.ppy.sh/oauth/token", {
    client_id: ENV.CLIENT_ID,
    client_secret: ENV.CLIENT_SECRET,
    grant_type: "client_credentials",
    scope: "public"
  }, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    }
  });

  const { access_token, expires_in } = tokenResponse.data;
  accessToken = access_token;
  tokenExpiryTime = Date.now() + expires_in * 1000;

  return access_token;
}

async function getAccessToken() {

  if (!accessToken || (tokenExpiryTime && Date.now() >= tokenExpiryTime)) {
    return await refreshToken();
  }
  return accessToken;
}

export const fetchBeatmaps = async (beatmapName: string) => {
  try {
    const token = await getAccessToken();

    const response = await axios.get(`${baseUrl}/beatmapsets/search?q=${beatmapName}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching beatmaps:", error);
  }
};
