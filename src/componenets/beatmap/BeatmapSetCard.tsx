import {
    Title,
    Stack,
    Group,
    Card,
    Grid,
    Indicator,
    Image,
    Text,
    Tooltip,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { IconAlertCircle, IconHeartFilled } from "@tabler/icons-react";
import { BeatmapsetSetModalContent } from "./BeatmapSetModal";
import { beatmapset } from "../../types";

type BeatmapSetCardProps = {
    beatmapset: beatmapset;
};

export default function BeatmapSetCard({ beatmapset }: BeatmapSetCardProps) {
    return (
        <Card
            bg={"dark"}
            radius={10}
            p={10}
            mah={350}
            pos={"relative"}
            style={{ cursor: "pointer" }}
        >
            <Grid>
                <Grid.Col span={4} pos="relative">
                    <Indicator
                        zIndex={1}
                        position="top-start"
                        color={
                            (beatmapset.ranked == -2 && "gray") ||
                            (beatmapset.ranked == -1 && "lime") ||
                            (beatmapset.ranked == 0 && "violet") ||
                            (beatmapset.ranked == 1 && "yellow") ||
                            (beatmapset.ranked == 2 && "cyan") ||
                            (beatmapset.ranked == 3 && "lime") ||
                            (beatmapset.ranked == 4 && "pink") ||
                            "lime"
                        }
                    >
                        <Image
                            src={beatmapset.covers.list}
                            radius={5}
                            w={"100%"}
                            pos={"relative"}
                        />
                        {beatmapset.nsfw && (
                            <Tooltip label="NSFW">
                                <IconAlertCircle
                                    size={10}
                                    color="red"
                                    style={{
                                        position: "absolute",
                                        top: 5,
                                        right: 5,
                                    }}
                                />
                            </Tooltip>
                        )}
                    </Indicator>
                </Grid.Col>
                <Grid.Col span={8}>
                    <Stack justify="space-between" h={"100%"} pb={5}>
                        <Title order={3}>{beatmapset.title}</Title>
                        <Group gap={4}>
                            {beatmapset.beatmaps.slice(0, 7).map((beatmap) => (
                                <Image
                                    key={beatmap.id}
                                    src={`/img/${beatmap.mode}.png`}
                                    w={16}
                                    alt="beatmap logo"
                                    style={{
                                        filter: "",
                                    }}
                                />
                            ))}
                            {beatmapset.beatmaps.length > 8 && (
                                <Text fz={15}>
                                    ... {beatmapset.beatmaps.length - 8}
                                </Text>
                            )}
                        </Group>
                    </Stack>
                </Grid.Col>
            </Grid>
            <Group pos={"absolute"} bottom={5} right={5} gap={5}>
                <Text>{beatmapset.favourite_count}</Text>
                <IconHeartFilled
                    style={{
                        color: "var(--mantine-color-red-8)",
                    }}
                />
            </Group>
        </Card>
    );
}
