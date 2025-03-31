import { getAccessToken } from "../utils/token.js";
import axios from "axios";

export const fetchUsers = async (req, res) => {
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
      res.status(500).send({
        message: "Something went wrong",
        error: error,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error occurred while trying to get token",
      error: error,
    });
  }
};

export const getUserById = async (req, res) => {
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
};
