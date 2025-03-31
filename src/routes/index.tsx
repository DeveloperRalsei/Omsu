import { Stack, SimpleGrid, Text, Button } from "@mantine/core";
import { createFileRoute, ErrorRouteComponent } from "@tanstack/react-router";
import { getBeatmapsets } from "@/utils";
import { IconAlertHexagon } from "@tabler/icons-react";
import BeatmapSetCard from "@/componenets/beatmap/BeatmapSetCard";

const errorComponent: ErrorRouteComponent = ({ error, reset }) => {
    return (
        <Stack mih="100vh" px="md" align="center" ta="center">
            <IconAlertHexagon color="var(--mantine-color-yellow-5)" />
            <Text c="dimmed">Something went wrong</Text>
            <div>
                <Text>{error.name}</Text>
                {": "}
                <Text c="dimmed">{error.message}</Text>
            </div>
            <Button onClick={reset}>Reset</Button>
        </Stack>
    );
};
export const Route = createFileRoute("/")({
    component: QueryBeatmap,
    loader: () => getBeatmapsets(),
    pendingComponent: () => "loading...",
    errorComponent,
});

function QueryBeatmap() {
    const beatmapsets = Route.useLoaderData();
    console.log(beatmapsets);

    return (
        <Stack>
            <SimpleGrid cols={{ md: 2, sm: 1 }}>
                {beatmapsets.map((b, i) => (
                    <BeatmapSetCard key={b.title + i} beatmapset={b} />
                ))}
            </SimpleGrid>
        </Stack>
    );
}
