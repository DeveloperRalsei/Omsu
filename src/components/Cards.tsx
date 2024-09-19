import { Paper, Title, Text, Image, Card, Grid, Group, Badge } from "@mantine/core";
import { openModal } from "@mantine/modals";
import React from "react";

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
  beatmap: any;
};

export function BeatmapCard({ beatmap }: BeatmapCardProps) {

  function openBeatmapModal() {
    openModal({
      title: <Title order={4}>{beatmap.title}</Title>,
      children: (
          <Group>
            <Text>BeatmapCcreator: </Text>
            <Text>{beatmap.creator}</Text>
          </Group>
      ),
      size: "lg"
    })
  }

  return (
    <Card bg={"dark"} radius={10} p={10} mah={200} onClick={openBeatmapModal}>
      <Grid>
        <Grid.Col span={{lg: 4, md: 2}}>
          <Image src={`${beatmap.covers.list}`} radius={5} w={120} />
        </Grid.Col>
        <Grid.Col span={{lg: 8, md: 10}}>
          <Group>
            <Title order={3}>{beatmap.title}</Title>
            <Badge variant="light" color={
              beatmap.ranked == -2 && "gray" ||
              beatmap.ranked == -1 && "lime" ||
              beatmap.ranked == 0 && "violet" ||
              beatmap.ranked == 1 && "yellow" ||
              beatmap.ranked == 2 && "cyan" ||
              beatmap.ranked == 3 && "lime" ||
              beatmap.ranked == 4 && "pink" ||
              "lime"
            }>
              {
                beatmap.ranked == -2 && "Graveyard" ||
                beatmap.ranked == -1 && "wip" ||
                beatmap.ranked == 0 && "Pending" ||
                beatmap.ranked == 1 && "Ranked" ||
                beatmap.ranked == 2 && "Approved" ||
                beatmap.ranked == 3 && "Qualified" ||
                beatmap.ranked == 4 && "Loved" || "undefined"
              }
            </Badge>
          </Group>
        </Grid.Col>
      </Grid>
    </Card>
  );
}