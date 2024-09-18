import { Paper, Title, Text, Image, Card, Grid } from "@mantine/core";
import React from "react";
import { beatmap } from "../definitions";

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
    beatmap: beatmap
};

export function BeatmapCard({ children, withImage, imgUrl, beatmap }: BeatmapCardProps) {
    return (
        <Card bg={"dark"} radius={10} p={10} >
            <Grid columns={10}>
                <Grid.Col span={{lg: 3, md: 10}}>
                    {withImage && (
                        <Card.Section>
                            <Image src={imgUrl} w={30} />
                        </Card.Section>
                    )}
                </Grid.Col>
                <Grid.Col>
                    <Title order={3}>{beatmap.title}</Title>
                </Grid.Col>
            </Grid>
        </Card>
    );
}