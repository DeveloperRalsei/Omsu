import { Paper, Title, Text, Image, Card, Grid, Group, Badge } from "@mantine/core";
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

    const ranked = beatmap.ranked;

    return (
        <Card bg={"dark"} radius={10} p={10} mah={200} component="a" href={`https://osu.ppy.sh/beatmapsets/${beatmap.id}`} target="_blank">
            <Grid>
                <Grid.Col span={4}>
                    <Image src={`${beatmap.covers.list}`} radius={5} w={120} />
                </Grid.Col>
                <Grid.Col span={8}>
                    <Group>
                        <Title order={3}>{beatmap.title}</Title>
                        <Badge variant="light" color={
                             beatmap.ranked == 1 && "yellow" ||
                             beatmap.ranked == 2 && "" ||
                             beatmap.ranked == 2 && "" ||
                             beatmap.ranked == 4 && "pink" ||
                             "lime"
                        }>
                            {
                                beatmap.ranked == 1 && "Ranked" ||
                                beatmap.ranked == 2 && "" ||
                                beatmap.ranked == 3 && "" ||
                                beatmap.ranked == 4 && "Loved"
                            }
                        </Badge>
                    </Group>
                </Grid.Col>
            </Grid>
        </Card>
    );
}