import { Title, Stack, Button, ScrollArea, Group, Badge, Card, Grid, Indicator, Image, Text } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { IconHeartFilled } from "@tabler/icons-react";
import { BeatmapsetSetModalContent } from "./BeatmapSetModal";
import { beatmapset } from "../../App";

type BeatmapSetCardProps = {
  beatmapset: beatmapset;
};

export default function BeatmapSetCard({ beatmapset }: BeatmapSetCardProps) {

  function openBeatmapModal() {
    openModal({
      title: <Title order={4}>{beatmapset.title}</Title>,
      children: <BeatmapsetSetModalContent beatmapset={beatmapset} />,
      size: "lg",
      pos: "relative"
    });
  }

  return (
    <Card bg={"dark"} radius={10} p={10} mah={200} pos={"relative"} onClick={openBeatmapModal} style={{ cursor: "pointer" }}>
      <Grid>
        <Grid.Col span={4}>
          <Indicator position="top-start" color={
            beatmapset.ranked == -2 && "gray" ||
            beatmapset.ranked == -1 && "lime" ||
            beatmapset.ranked == 0 && "violet" ||
            beatmapset.ranked == 1 && "yellow" ||
            beatmapset.ranked == 2 && "cyan" ||
            beatmapset.ranked == 3 && "lime" ||
            beatmapset.ranked == 4 && "pink" ||
            "lime"
          } >

            <Image src={beatmapset.covers.list} radius={5} w={"100%"} pos={"relative"} />
          </Indicator>
        </Grid.Col>
        <Grid.Col span={8}>
          <Stack>
            <Title order={3}>{beatmapset.title}</Title>

      <Group pos={"absolute"} bottom={10} right={10} gap={5}>
        <Text>{beatmapset.favourite_count}</Text>
        <IconHeartFilled style={{
          color: "var(--mantine-color-red-8)"
        }} />
      </Group>
          </Stack>
        </Grid.Col>

      </Grid>
    </Card>
  );
}