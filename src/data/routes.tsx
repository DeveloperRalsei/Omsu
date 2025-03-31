import { IconList, IconNews, IconUsers } from "@tabler/icons-react";
import { FileRouteTypes } from "../routeTree.gen";
import { Kbd } from "@mantine/core";

export type Route = {
    label: string;
    path: FileRouteTypes["fullPaths"];
    icon: React.ReactNode;
    kbd: React.ReactNode;
};

export const routes: Route[] = [
    {
        label: "Beatmaps",
        path: "/",
        icon: <img src={"/img/osu.png"} alt="osu image" width={20} />,
        kbd: (
            <>
                <Kbd size="xs">Ctrl</Kbd> + <Kbd size="xs">1</Kbd>
            </>
        ),
    },
    {
        label: "Users",
        path: "/users",
        icon: <IconUsers color="#fff" />,
        kbd: (
            <>
                <Kbd size="xs">Ctrl</Kbd> + <Kbd size="xs">2</Kbd>
            </>
        ),
    },
    {
        label: "News",
        path: "/news",
        icon: <IconNews color="#fff" />,
        kbd: (
            <>
                <Kbd size="xs">Ctrl</Kbd> + <Kbd size="xs">3</Kbd>
            </>
        ),
    },
    {
        label: "Updates",
        path: "/updates",
        icon: <IconList />,
        kbd: <></>,
    },
];
