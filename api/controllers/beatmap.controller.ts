import { RequestHandler } from "express";
import {
    beatmap_category,
    beatmap_sorting,
    beatmap_statuses,
    Modes_names,
    v2,
} from "osu-api-extended";

export const fetchBeatmaps: RequestHandler = async (req, res) => {
    const { q, nfsw, mode, status, sort, categories } = req.params;

    const { beatmapsets, error } = await v2.search({
        type: "beatmaps",
        query: q as string,
        _nsfw: nfsw === "1",
        status: (status as beatmap_statuses) || "any",
        mode: mode as Modes_names,
        sort: sort as beatmap_sorting,
        category: categories
            ? ((categories as string).split(",") as beatmap_category[])
            : [],
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
