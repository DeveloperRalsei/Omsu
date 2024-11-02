import {
  ActionIcon,
  Anchor,
  AppShell,
  Button,
  Container,
  Group,
  Image,
  Kbd,
  Loader,
  LoadingOverlay,
  NavLink,
  Space,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { author } from "../package.json";
import { IconQuestionMark, IconUsers } from "@tabler/icons-react";
import { useEffect, useState, useTransition } from "react";
import { QueryUser, QueryBeatmap, baseUrl } from "./pages";
import "./styles.css";
import { openModal } from "@mantine/modals";
import HelpDocument from "../documents/WhatIsThis.mdx";
import { useMdxComps } from "./hooks/useMdxComps";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { useHotkeys } from "@mantine/hooks";

type page = "fetchUser" | "fetchBeatmap";

export default function () {
  const [page, setPage] = useState<page>("fetchBeatmap");
  const [isPending, startTransition] = useTransition();
  const components = useMdxComps();
  const [pingData, setPingData] = useState<any>();
  const theme = useMantineTheme();

  useEffect(() => {
    axios
      .get(baseUrl + "/api/ping")
      .then((res) => {
        setPingData(res.data);
        showNotification({
          message: "Connected API :3",
        });
      })
      .catch((err) => {
        console.error(err);
        showNotification({
          message:
            "Something went wrong while connection api (:/). Please check your internet connection and refresh the page",
          color: "red",
          autoClose: 5000,
        });
      });
  }, []);

  useHotkeys([
    ["ctrl+1", () => setPage("fetchBeatmap")],
    ["ctrl+2", () => setPage("fetchUser")],
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
      <LoadingOverlay
        visible={!pingData}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ type: "bars" }}
      />

      <AppShell.Navbar>
        <NavLink
          label="Query Beatmapsets"
          leftSection={<img src={"/img/osu.png"} alt="osu image" width={20} />}
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
              <Button
                color={page === "fetchBeatmap" ? "dark" : theme.primaryColor}
                disabled={page === "fetchBeatmap"}
                onClick={() => setPage("fetchBeatmap")}>
                <Group>
                  <img src={"/img/osu.png"} alt="osu image" width={20} />
                  {"Beatmaps"}
                </Group>
              </Button>
              <Button
                color={page === "fetchUser" ? "dark" : theme.primaryColor}
                disabled={page === "fetchUser"}
                onClick={() => setPage("fetchUser")}>
                <Group>
                  <IconUsers color="#fff" />
                  {"Users"}
                </Group>
              </Button>
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
          {isPending ? (
            <Stack>
              <Loader type="bars" />
            </Stack>
          ) : (
            <Stack>
              {page === "fetchUser" && <QueryUser />}
              {page === "fetchBeatmap" && <QueryBeatmap />}
            </Stack>
          )}
        </Container>
      </AppShell.Main>

      <AppShell.Footer></AppShell.Footer>

      <AppShell.Footer px={30}>
        <Group gap={5} w={"100%"} justify="end">
          Made By{" "}
          <Anchor href={author.url} target="_blank">
            {author.name}
          </Anchor>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}
