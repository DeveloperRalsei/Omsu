import { showNotification } from "@mantine/notifications";
import { beatmapset, Newsletter } from "./types";

export const wait = (milliseconds: number = 1000) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

export const loadApp = () => fetch("/api/ping").then((res) => res.json());

export const getBeatmapsets = async (
    q: string = "",
    isRanked: boolean = true,
): Promise<beatmapset[]> =>
    fetch(`/api/beatmapsets?q=${q}&isRanked=${isRanked ? "1" : "0"}`).then(
        (res) => res.json(),
    );

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
