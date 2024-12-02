import {
    ActionIcon,
    AppShell,
    Container,
    Group,
    Image,
    Kbd,
    Loader,
    NavLink,
    Space,
    Stack,
    Title,
    Tooltip,
    useMantineTheme,
} from "@mantine/core";
import { IconNews, IconQuestionMark, IconUsers } from "@tabler/icons-react";
import { Suspense, lazy } from "react";
import "./styles.css";
import { openModal } from "@mantine/modals";
import HelpDocument from "../documents/WhatIsThis.mdx";
import { useMdxComps } from "./hooks/useMdxComps";
import { useHotkeys } from "@mantine/hooks";
export const baseUrl = import.meta.env.DEV
    ? "http://localhost:3000"
    : "https://omsu-api.onrender.com";

import { usePage } from "./ui/context/PageContext";
import ReviewNews from "./pages/ReviewNews";

const QueryBeatmap = lazy(() => import("./pages/QueryBeatmap"));
const QueryUsers = lazy(() => import("./pages/QueryUser"));
const News = lazy(() => import("./pages/News"));

export default function () {
    const { currentPage: page, setPage } = usePage();
    const components = useMdxComps();
    const theme = useMantineTheme();

    useHotkeys([
        ["ctrl+1", () => setPage("fetchBeatmap")],
        ["ctrl+2", () => setPage("fetchUser")],
        ["ctrl+3", () => setPage("news")],
        ["shift+*", openHelpModal],
    ]);

    function openHelpModal() {
        openModal({
            title: <Title order={2}>What is Omsu?</Title>,
            children: <HelpDocument components={components} />,
            size: "lg",
        });
    }

    return (
        <AppShell
            header={{ height: 50 }}
            pos={"relative"}
            footer={{ height: 20, offset: false }}
            navbar={{
                breakpoint: "md",
                width: 250,
                collapsed: { desktop: false, mobile: true },
            }}>
            <AppShell.Navbar>
                <NavLink
                    label="Query Beatmapsets"
                    leftSection={
                        <img src={"/img/osu.png"} alt="osu image" width={20} />
                    }
                    rightSection={
                        <>
                            <Kbd size="xs">Ctrl</Kbd> + <Kbd size="xs">1</Kbd>
                        </>
                    }
                    onClick={() => setPage("fetchBeatmap")}
                    active={page === "fetchBeatmap"}
                />
                <NavLink
                    label="Query Users"
                    leftSection={<IconUsers color="#fff" />}
                    rightSection={
                        <>
                            <Kbd size="xs">Ctrl</Kbd> + <Kbd size="xs">2</Kbd>
                        </>
                    }
                    onClick={() => setPage("fetchUser")}
                    active={page === "fetchUser"}
                />
                <NavLink
                    label="News"
                    leftSection={<IconNews color="#fff" />}
                    rightSection={
                        <>
                            <Kbd size="xs">Ctrl</Kbd> + <Kbd size="xs">3</Kbd>
                        </>
                    }
                    onClick={() => setPage("news")}
                    active={page === "news"}
                />
            </AppShell.Navbar>

            <AppShell.Header>
                <Group
                    w={"100%"}
                    h={"100%"}
                    align="center"
                    justify="space-between"
                    px={"sm"}>
                    <Group>
                        <Group visibleFrom="sm">
                            <Image src={"/img/logo.png"} alt="Logo" w={40} />
                            <Title order={3}>Welcome to Omsu!</Title>
                        </Group>
                        <Group hiddenFrom="md">
                            <Tooltip label="News">
                                <ActionIcon
                                    onClick={() => setPage("news")}
                                    disabled={page === "news"}>
                                    <IconNews color="white" />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Beatmaps">
                                <ActionIcon
                                    color={
                                        page === "fetchBeatmap"
                                            ? "dark"
                                            : theme.primaryColor
                                    }
                                    disabled={page === "fetchBeatmap"}
                                    onClick={() => setPage("fetchBeatmap")}>
                                    <img
                                        src={"/img/osu.png"}
                                        alt="osu image"
                                        width={20}
                                    />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Users">
                                <ActionIcon
                                    color={
                                        page === "fetchUser"
                                            ? "dark"
                                            : theme.primaryColor
                                    }
                                    disabled={page === "fetchUser"}
                                    onClick={() => setPage("fetchUser")}>
                                    <IconUsers color="#fff" />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    </Group>
                    <Group>
                        <ActionIcon onClick={openHelpModal}>
                            <IconQuestionMark />
                        </ActionIcon>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Main>
                <Container size={"md"}>
                    <Space h={30} />
                    <Title order={1} ta="center">
                        {page === "fetchBeatmap" && "Beatmaps"}
                        {page === "fetchUser" && "Users"}
                    </Title>
                    <Space h={30} />
                    <Suspense fallback={<Loader type="dots" />}>
                        <Stack>
                            {page === "fetchUser" && <QueryUsers />}
                            {page === "fetchBeatmap" && <QueryBeatmap />}
                            {page === "news" && <News />}
                            {page === "newsletter" && <ReviewNews />}
                        </Stack>
                    </Suspense>
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}
