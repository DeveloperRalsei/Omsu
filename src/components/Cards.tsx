import { Paper, Title, Text, Image, Card, Grid, Group, Badge, Stack, Anchor, Button, Indicator, Loader, LoadingOverlay, ScrollArea } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { IconExternalLink, IconExternalLinkOff } from "@tabler/icons-react";
import React, { Suspense } from "react";

export function HomeCard({ title, children }: { title?: string, children?: React.ReactNode; }) {
  return (
    <Paper bg={"dark"} radius={10} p={20} withBorder shadow="lg">
      {title && <Title order={3} ta={"center"} >
        {title}
      </Title>}
      <Text>
        {children}
      </Text>
    </Paper>
  );
}

type BeatmapCardProps = {
  children?: React.ReactNode,
  withImage?: boolean,
  imgUrl?: string;
  beatmap: {
    id: number;
    title: string,
    creator: string,
    tags: string;
    ranked: -2 | -1 | 0 | 1 | 2 | 3 | 4,
    covers: {
      "card": string;
      "card@2x": string;
      "list": string;
    };
    status: string;
  };
};

export function BeatmapCard({ beatmap }: BeatmapCardProps) {

  const beatmapTags = beatmap.tags.split(" ");

  function openBeatmapModal() {
    openModal({
      title: <Title order={4}>{beatmap.title}</Title>,
      children: (
        <Stack>
          <Button variant="light" component="a" rightSection={<IconExternalLink/>} href={`https://osu.ppy.sh/beatmapsets/${beatmap.id}`}>View the beatmap</Button>
          <Image w={"100%"} src={beatmap.covers["card@2x"]} alt="beatmapCard" radius={"lg"} />
          <ScrollArea h={"30vh"}>
            <Group>
              <Text>Beatmap Creator: </Text>
              <Text>{beatmap.creator}</Text>
            </Group>
            <Group>
              <Text>Beatmap Status: </Text>
              <Badge
                color={
                  beatmap.ranked == -2 && "gray" ||
                  beatmap.ranked == -1 && "lime" ||
                  beatmap.ranked == 0 && "violet" ||
                  beatmap.ranked == 1 && "yellow" ||
                  beatmap.ranked == 2 && "cyan" ||
                  beatmap.ranked == 3 && "lime" ||
                  beatmap.ranked == 4 && "pink" ||
                  "lime"
                }
              >{beatmap.status}</Badge>
            </Group>
            <Group mb={50}>
              <Text>Beatmap Tags: </Text>
              <Group>
                {beatmapTags.map((tag, i) => (
                  <Badge component="a" href={`https://osu.ppy.sh/beatmapsets?q=${tag}`} target="_blank" style={{ cursor: "pointer" }} variant="light" key={i}>{tag}</Badge>
                ))}
              </Group>
            </Group>
          </ScrollArea>
        </Stack>
      ),
      size: "lg",
      pos: "relative"
    });
  }

  return (
    <Card bg={"dark"} radius={10} p={10} mah={200} onClick={openBeatmapModal} style={{ cursor: "pointer" }}>
      <Grid>
        <Grid.Col span={4}>
          <Image src={beatmap.covers.list} radius={5} w={{}} />
        </Grid.Col>
        <Grid.Col span={8}>
          <Stack>
            <Indicator color={
              beatmap.ranked == -2 && "gray" ||
              beatmap.ranked == -1 && "lime" ||
              beatmap.ranked == 0 && "violet" ||
              beatmap.ranked == 1 && "yellow" ||
              beatmap.ranked == 2 && "cyan" ||
              beatmap.ranked == 3 && "lime" ||
              beatmap.ranked == 4 && "pink" ||
              "lime"
            }>
              <Title order={3}>{beatmap.title}</Title>
            </Indicator>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
}