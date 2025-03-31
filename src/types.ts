export type beatmap = {
    id: number;
    mode: "osu" | "taiko" | "fruits" | "mania";
    status: "ranked" | "approved" | "qualified" | "loved" | "unranked";
    difficulty_rating: number;
    url: string;
    playcount: number;
    passcount: number;
    total_length: number;
    count_circles: number;
    count_sliders: number;
    bpm: number;
};

export type beatmapset = {
    id: number;
    title: string;
    creator: string;
    tags: string;
    description: { description: string };
    ranked: -2 | -1 | 0 | 1 | 2 | 3 | 4;
    covers: {
        card: string;
        "card@2x": string;
        list: string;
        "list@2x": string;
        slimcover: string;
        "slimcover@2x": string;
    };
    nsfw: boolean;
    status: string;
    play_count: number;
    favourite_count: number;
    beatmaps: beatmap[];
    genre: { name: string; id: number };
    language: { name: string; id: number };
};

export type User = {
    id: number;
    username: string;
    avatar_url: string;
    is_active: boolean;
    is_online: boolean;
    playmode: "osu" | "mania" | "fruits" | "taiko";
    statistics: {
        global_rank: number;
        country_rank: number;
        total_score: number;
        pp: number;
        play_time: number;
        play_count: number;
        level: {
            progress: number;
            current: number;
        };
        grade_counts: {
            a: number;
            s: number;
            sh: number;
            ss: number;
            ssh: number;
        };
    };
};

export type Newsletter = {
    id: number;
    title: string;
    author: string;
    edit_url: string;
    first_image: string;
    preview: string;
    published_at: string;
};
