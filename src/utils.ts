import { showNotification } from "@mantine/notifications";
import { BeatmapFormValues, beatmapset, Newsletter } from "./types";

export const wait = (milliseconds: number = 1000) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

export const loadApp = () => fetch("/api/ping").then((res) => res.json());

export const getBeatmapsets = async ({
    q,
    status,
    mode,
    nfsw,
    genre,
}: BeatmapFormValues): Promise<beatmapset[]> => {
    const params = new URLSearchParams();

    if (q) params.append("q", q);
    if (status) params.append("status", status);
    if (mode) params.append("mode", mode);
    if (nfsw) params.append("nfsw", "1");
    if (genre) params.append("genre", genre);

    const res = await fetch(`/api/beatmapsets?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch beatmapsets");
    return res.json();
};

export const getBeatmapsetById = async (
    id: number | string,
): Promise<beatmapset> =>
    fetch(`/api/beatmapset/${id}`)
        .then((res) => res.json())
        .catch((err) => {
            throw new Error(err);
        });

export const getNews = async (): Promise<Newsletter[]> => {
    const res = await fetch("/api/news");
    if (!res.ok) {
        showNotification({ message: "Something went wrong 😿", color: "red" });
        return [];
    }

    const { news_posts: data } = await res.json();
    return data;
};

export const getNewsletter = (name: string) =>
    fetch(
        `https://raw.githubusercontent.com/ppy/osu-wiki/refs/heads/master/news/${new Date().getFullYear()}/${name}.md`,
    ).then((res) => res.text());
