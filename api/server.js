import express from "express";
const api = express();
import { config } from "dotenv";
config();
import axios from "axios";
import cors from "cors";

api.use(express.json());
api.use(cors());

api.use((req, res, next) => {
  console.log(req.ip, req.url, req.query, req.method);
  if (req.method != "GET") {
    console.log(req.body);
  }

  next();
});

let accessToken;
let tokenExpiryTime;

const data = new URLSearchParams({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_KEY,
  grant_type: "client_credentials",
  scope: "public",
}).toString();

async function refreshToken() {
  try {
    const tokenResponse = await axios.post(
      "https://osu.ppy.sh/oauth/token",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    );

    const { access_token, expires_in } = tokenResponse.data;
    accessToken = access_token;
    tokenExpiryTime = Date.now() + expires_in * 1000;

    return access_token;
  } catch (error) {
    console.error(
      "Error refreshing token:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error refreshing Token");
  }
}

async function getAccessToken() {
  if (!accessToken || (tokenExpiryTime && Date.now() >= tokenExpiryTime)) {
    return await refreshToken();
  }
  return accessToken;
}

api.get("/api/fetch-beatmaps", async (req, res) => {
  const { q, isRanked } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Fill all required filters : q" });
  }

  try {
    const token = await getAccessToken();

    const url = !isRanked
      ? `https://osu.ppy.sh/api/v2/beatmapsets/search?q=${q}&beatmapset_status=-2`
      : `https://osu.ppy.sh/api/v2/beatmapsets/search?q=${q}&beatmapset_status=0`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching beatmaps:",
      error.response ? error.response.data : error.message
    );
    return res.status(500).json({ error: "Error fetching beatmaps" });
  }
});

api.get("/ping", async (req, res) => {
  try {
    const token = await getAccessToken();

    res.send({ message: "Ping action successful" });
  } catch (error) {
    res.send({ message: error });
  }
});

api.get("/api/search-user", async (req, res) => {
  const { q, page } = req.query;

  try {
    const token = await getAccessToken();

    const queryString = typeof q === "string" ? q : "";
    const pageString = typeof page === "string" ? page : "1";

    const params = new URLSearchParams({
      mode: "user",
      query: queryString,
      page: pageString,
    });

    const url = "https://osu.ppy.sh/api/v2/search?" + params;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      res.send(response.data);
    } catch (error) {
      res.status(500).send({ message: "Something went wrong", error: error });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error occurred while trying to get token",
      error: error,
    });
  }
});

api.get("/api/user/:id", async (req, res) => {
  const url = "https://osu.ppy.sh/api/v2/users";

  try {
    const token = await getAccessToken();
    const response = await axios.get(`${url}/${req.params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      return res.status(404).send({
        message: "Couldn't find any player",
      });
    }

    res.send(response.data);
  } catch (error) {
    console.log("Error fetching user: " + error);

    return res.status(401).send({
      error,
    });
  }
});

api.get("*", (req, res) => {
  res.send({ message: "Wrong Usage: " + req.url });
});

const port = process.env.PORT || 3000;
api.listen(port, () => console.log(`API running | http://localhost:${port}`));
