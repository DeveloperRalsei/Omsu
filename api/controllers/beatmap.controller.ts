import { RequestHandler } from "express";
import {
    beatmap_genres,
    beatmap_sorting,
    beatmap_statuses,
    Modes_names,
    v2,
} from "osu-api-extended";

export const fetchBeatmaps: RequestHandler = async (req, res) => {
    const { q, nfsw, mode, status, sort, genre } = req.query;

    try {
        const { beatmapsets, error } = await v2.search({
            type: "beatmaps",
            query: q as string,
            _nsfw: nfsw === "1",
            status: (status as beatmap_statuses) || "any",
            mode: mode as Modes_names,
            sort: sort as beatmap_sorting,
            genre: genre as beatmap_genres,
        });
        if (error != null) res.status(500).send(error);
        res.send(beatmapsets);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
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
