import axios from "axios";
import { RequestHandler } from "express";
import { getAccessToken } from "../utils/token";
import { v2 } from "osu-api-extended";

const baseUrl = "https://osu.ppy.sh/api/v2";

export const fetchBeatmaps: RequestHandler = async (req, res) => {
    const { q, isRanked, mode } = req.query;

    const { beatmapsets, error } = await v2.search({
        type: "beatmaps",
        query: q as string,
    });

    if (error != null) res.status(500).send(error);
    res.send(beatmapsets);
};

export const getById: RequestHandler = async (req, res) => {
    const id = req.params.id;
    try {
        const beatmapset = await v2.beatmaps.details({
            type: "set",
            id: Number(id),
        });
        res.send(beatmapset);
    } catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
};
