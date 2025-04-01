import { ErrorComponent } from "@/componenets/app/error-component";
import { BeatmapCard } from "@/componenets/beatmap/BeatmapCard";
import { getBeatmapsetById } from "@/utils";
import {
    ActionIcon,
    Group,
    Image,
    Stack,
    Title,
    Text,
    SimpleGrid,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/beatmapset/$id")({
    component: RouteComponent,
    errorComponent: ErrorComponent,
    loader: ({ params }) => getBeatmapsetById(params.id),
    pendingComponent: () => "loading...",
});

function RouteComponent() {
    const beatmapset = Route.useLoaderData();
    return (
        <Stack>
            <Image
                width="100%"
                src={beatmapset.covers["slimcover@2x"]}
                alt="cover@2x"
                radius="md"
            />
            <Group>
                <Group flex={1}>
                    <ActionIcon component={Link} to="/">
                        <IconArrowLeft />
                    </ActionIcon>
                    <Title order={2}>{beatmapset.title}</Title>
                </Group>
                <Group gap={4}>
                    <Text span>Creator: </Text>
                    <Text c="dimmed" span>
                        {beatmapset.creator}
                    </Text>
                </Group>
            </Group>

            <SimpleGrid cols={{ md: 2, sm: 1 }}>
                <Stack>
                    <Title order={3}>Beatmaps</Title>
                    {beatmapset.beatmaps.map((b, i) => (
                        <BeatmapCard beatmap={b} key={b.url + i} />
                    ))}
                </Stack>
                <Stack>uwu</Stack>
            </SimpleGrid>
        </Stack>
    );
}
