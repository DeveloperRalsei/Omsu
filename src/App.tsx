import {
    AppShell,
    Container,
    Group,
    Image,
    NavLink,
    Space,
    Stack,
    Title,
} from "@mantine/core";
import { useState } from "react";
import "./styles.css";
import { useHotkeys, useMediaQuery } from "@mantine/hooks";
export const baseUrl = import.meta.env.DEV
    ? "http://localhost:3000"
    : "https://omsu-api.onrender.com";

import { Link, useNavigate } from "@tanstack/react-router";
import { routes } from "./data/routes";

export default function App({
    children,
    title,
}: {
    children: React.ReactNode;
    title?: string;
}) {
    const isMobile = useMediaQuery("(max-width: 48em)");
    const navigate = useNavigate();
    const [active, setActive] = useState(0);

    useHotkeys([
        [
            "ctrl+1",
            () =>
                navigate({
                    to: "/",
                }),
        ],
        ["ctrl+2", () => navigate({ to: "/users" })],
        ["ctrl+3", () => navigate({ to: "/news" })],
    ]);

    return (
        <AppShell
            header={{ height: 50 }}
            pos={"relative"}
            footer={{ height: 80, offset: true, collapsed: !isMobile }}
            navbar={{
                breakpoint: "md",
                width: 250,
                collapsed: { desktop: false, mobile: true },
            }}
        >
            <AppShell.Navbar>
                {routes.map((r, i) => (
                    <NavLink
                        key={r.label + i}
                        component={Link}
                        to={r.path}
                        label={r.label}
                        leftSection={r.icon}
                        rightSection={r.kbd}
                        active={active === i}
                        onClick={() => setActive(i)}
                    />
                ))}
            </AppShell.Navbar>

            <AppShell.Header>
                <Group
                    w={"100%"}
                    h={"100%"}
                    align="center"
                    justify="space-between"
                    px={"sm"}
                >
                    <Group>
                        <Image src={"/img/logo.png"} alt="Logo" w={40} />
                        <Title order={3}>Welcome to Omsu!</Title>
                    </Group>
                    {/* <Group> */}
                    {/*     <ToggleColorScheme /> */}
                    {/* </Group> */}
                </Group>
            </AppShell.Header>

            <AppShell.Main>
                <Container size={"md"}>
                    <Space h={30} />
                    {title && (
                        <Title order={2} ta="center">
                            {title}
                        </Title>
                    )}
                    <Space h={30} />
                    <Stack>{children}</Stack>
                </Container>
            </AppShell.Main>

            <AppShell.Footer>
                <Group h="100%" w="100%" align="center" justify="space-around">
                    {routes.map((r, i) => (
                        <Stack
                            key={r.path + i}
                            p="sm"
                            gap={3}
                            align="center"
                            onClick={() => {
                                setActive(i);
                                navigate({ to: r.path });
                            }}
                            style={{
                                borderRadius: "var(--mantine-radius-default)",
                                backgroundColor:
                                    active === i
                                        ? "var(--mantine-primary-color-light)"
                                        : "transparent",
                                cursor: "pointer",
                            }}
                        >
                            {r.icon}
                            {r.label}
                        </Stack>
                    ))}
                </Group>
            </AppShell.Footer>
        </AppShell>
    );
}
