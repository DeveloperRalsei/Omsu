import { Text, Image, Group, Paper, Anchor } from "@mantine/core";
import { beatmap } from "../../types";
import { IconExternalLink } from "@tabler/icons-react";

export const BeatmapCard = ({ beatmap }: { beatmap: beatmap }) => {
    return (
        <Paper w={"100%"} p={"xs"} py={5} withBorder>
            <Group justify="space-between" align="center">
                <Group>
                    <Image
                        src={`/img/${beatmap.mode}.png`}
                        alt="beatmap logo"
                        w={16}
                    />
                    <Text>{beatmap.mode}</Text>
                </Group>
                <Text>{beatmap.difficulty_rating} ★</Text>
                <Text>{beatmap.playcount} play</Text>
                <Anchor
                    href={`https://osu.ppy.sh/beatmapsets/${beatmap.id}`}
                    target="_blank">
                    <IconExternalLink />
                </Anchor>
            </Group>
        </Paper>
    );
};
