import {
    Text,
    Badge,
    Button,
    Grid,
    Group,
    Image,
    Loader,
    Stack,
    Accordion,
    ScrollArea,
    ActionIcon,
} from "@mantine/core";
import { beatmapset } from "../../types";
import { useEffect, useState } from "react";
import { baseUrl } from "../../App";
import { IconExternalLink } from "@tabler/icons-react";
import { BeatmapCard } from "./BeatmapCard";
import axios from "axios";

export function BeatmapsetSetModalContent({
    beatmapset,
}: {
    beatmapset: beatmapset;
}) {
    const [loading, setLoading] = useState(false);
    const [fetchedBeatmapset, setFetchedBeatmapset] = useState<beatmapset>();

    useEffect(() => {
        async function fetchBeatmapset() {
            setLoading(true);

            try {
                const response = await axios.get(
                    `${baseUrl}/api/beatmapset/${beatmapset.id}`
                );

                const data = response.data;
                setFetchedBeatmapset(data);

                if (import.meta.env.DEV) console.log(fetchedBeatmapset);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchBeatmapset();
    }, []);

    if (loading || !fetchedBeatmapset)
        return (
            <Group w={"100%"}>
                <Loader />
            </Group>
        );

    const statusColor =
        (fetchedBeatmapset.ranked == -2 && "gray") ||
        (fetchedBeatmapset.ranked == -1 && "lime") ||
        (fetchedBeatmapset.ranked == 0 && "violet") ||
        (fetchedBeatmapset.ranked == 1 && "yellow") ||
        (fetchedBeatmapset.ranked == 2 && "cyan") ||
        (fetchedBeatmapset.ranked == 3 && "lime") ||
        (fetchedBeatmapset.ranked == 4 && "pink") ||
        "lime";

    return (
        <Stack>
            <Grid>
                <Grid.Col span={{ lg: 4, xs: 12 }}>
                    <Stack>
                        <Image
                            visibleFrom="lg"
                            src={fetchedBeatmapset!.covers["list@2x"]}
                            alt="beatmapset-card"
                            radius="sm"
                            w={"100%"}
                        />
                        <Image
                            hiddenFrom="lg"
                            src={fetchedBeatmapset!.covers["card@2x"]}
                            alt="beatmapset-card"
                            radius="sm"
                            w={"100%"}
                        />
                        <Button
                            component="a"
                            href={`https://osu.ppy.sh/beatmapsets/${fetchedBeatmapset.id}`}
                            target="_blank"
                            rightSection={<IconExternalLink size={18} />}>
                            View Beatmapset
                        </Button>
                    </Stack>
                </Grid.Col>

                <Grid.Col span={{ lg: 8, xs: 12 }}>
                    <Stack>
                        <Group w={"100%"} justify="space-between">
                            <Group>
                                <Text>Beatmapset Status: </Text>
                                <Badge variant="light" color={statusColor}>
                                    {fetchedBeatmapset.status}
                                </Badge>
                            </Group>
                        </Group>
                        <ScrollArea h={"50vh"}>
                            <Accordion variant="separated">
                                <Accordion.Item value="beatmaps">
                                    <Accordion.Control>
                                        Beatmaps (
                                        {fetchedBeatmapset.beatmaps.length})
                                    </Accordion.Control>
                                    <Accordion.Panel>
                                        <Stack>
                                            {fetchedBeatmapset.beatmaps
                                                .sort(
                                                    (b1, b2) =>
                                                        b1.difficulty_rating -
                                                        b2.difficulty_rating
                                                )
                                                .map((beatmap) => (
                                                    <BeatmapCard
                                                        beatmap={beatmap}
                                                        key={beatmap.id}
                                                    />
                                                ))}
                                        </Stack>
                                    </Accordion.Panel>
                                </Accordion.Item>
                            </Accordion>
                        </ScrollArea>
                    </Stack>
                </Grid.Col>
            </Grid>
        </Stack>
    );
}
