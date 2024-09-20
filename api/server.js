import express from "express";
const api = express();
import { config } from "dotenv";
config();
import axios from "axios";
import cors from 'cors';

api.use(express.json());
api.use(cors());

api.use((req, res, next) => {
  console.log(req.ip, req.url, req.method);
  next();
});

let accessToken;
let tokenExpiryTime;

async function refreshToken() {
  try {
    const tokenResponse = await axios.post("https://osu.ppy.sh/oauth/token",
      new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_KEY,
        grant_type: "client_credentials",
        scope: "public"
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        }
      }
    );

    const { access_token, expires_in } = tokenResponse.data;
    accessToken = access_token;
    tokenExpiryTime = Date.now() + expires_in * 1000;

    return access_token;
  } catch (error) {
    console.error("Error refreshing token:", error.response ? error.response.data : error.message);
    throw new Error("Error refreshing Token");
  }
}

async function getAccessToken() {
  if (!accessToken || (tokenExpiryTime && Date.now() >= tokenExpiryTime)) {
    return await refreshToken();
  }
  return accessToken;
}

api.post("/api/fetch-beatmaps", async (req, res) => {
  const { q, isRanked } = req.body;

  if (!q) {
    return res.status(400).json({ error: 'Fill all required filters : q' });
  }

  try {
    const token = await getAccessToken();

    const url = isRanked ? `https://osu.ppy.sh/api/v2/beatmapsets/search?q=${q}` : `https://osu.ppy.sh/api/v2/beatmapsets/search?q=${q}&beatmapset_status=-2`
    const response = await axios.get(url, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    return res.json(response.data);
  } catch (error) {
    console.error("Error fetching beatmaps:", error.response ? error.response.data : error.message);
    return res.status(500).json({ error: "Error fetching beatmaps" });
  }
});

api.get("/ping", async (req,res) => {
  const token = await getAccessToken()
  const response = await axios.get("https://osu.ppy.sh/api/v2", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    },
    
  })

  res.send({})
})

api.get("*", (req, res) => {
  res.send({ message: "Wrong Usage: " + req.url });
});


const port = process.env.PORT || 3000;
api.listen(port, () => console.log(`API running | http://localhost:${port}`));
