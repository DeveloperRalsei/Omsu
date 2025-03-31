import { RequestHandler } from "express";

export const getNews: RequestHandler = async (_req, res) => {
    const url = "https://osu.ppy.sh/api/v2/news";

    const response = await fetch(url);
    if (!response.ok) {
        res.status(500).send({
            message: "something went wrong",
        });
    }
    res.json(await response.json());
};

export const getNewsletter: RequestHandler = async (req, res) => {
    const url = "https://osu.ppy.sh/api/v2/news/";
    const name = req.params.name;

    const response = await fetch(url + name);
    if (!response.ok) res.status(500).send({ message: "something went wrong" });

    res.json(await response.json());
};
