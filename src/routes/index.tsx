import {
    Stack,
    SimpleGrid,
    Text,
    Fieldset,
    ActionIcon,
    TextInput,
    Group,
    Divider,
    ActionIconGroup,
    Switch,
    Chip,
    ScrollArea,
    Collapse,
    Skeleton,
    ChipGroup,
} from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { getBeatmapsets } from "@/utils";
import {
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
    IconSearch,
    IconX,
} from "@tabler/icons-react";
import BeatmapSetCard from "@/componenets/beatmap/BeatmapSetCard";
import { ErrorComponent } from "@/componenets/app/error-component";
import { useForm } from "@mantine/form";
import { BeatmapFormValues } from "@/types";
import { FormEvent, useState } from "react";
import { beatmap_genres } from "osu-api-extended";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
    validateSearch: () => ({}) as Partial<BeatmapFormValues>,
    component: QueryBeatmap,
    errorComponent: ErrorComponent,
});

function QueryBeatmap() {
    const queries = Route.useSearch();
    const form = useForm<BeatmapFormValues>({
        mode: "controlled",
        initialValues: queries as Required<typeof queries>,
    });

    const [page, setPage] = useState(1);
    const [elementsPerPage, setElementsPerPage] = useState(10);
    const [collapsed, setCollapsed] = useState(true);

    const {
        data: beatmapsets,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["beatmapsets"],
        queryFn: () => getBeatmapsets(form.values),
    });

    const genres: beatmap_genres[] = [
        "Unspecified",
        "Electronic",
        "Hip Hop",
        "Metal",
        "Jazz",
        "Classical",
        "Novelty",
        "Folk",
        "Pop",
        "Other",
        "Anime",
        "Video Game",
        "Rock",
    ];

    const totalPages = beatmapsets
        ? Math.ceil(beatmapsets.length / elementsPerPage)
        : 0;

    const paginatedBeatmapsets = beatmapsets?.slice(
        (page - 1) * elementsPerPage,
        page * elementsPerPage,
    );

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        refetch();
    };

    return (
        <Stack>
            <form onSubmit={handleSubmit}>
                <Group>
                    <TextInput
                        placeholder="Search..."
                        flex={1}
                        {...form.getInputProps("q")}
                    />
                    <ActionIcon onClick={form.reset}>
                        <IconX />
                    </ActionIcon>
                    <ActionIcon type="submit">
                        <IconSearch />
                    </ActionIcon>
                </Group>
                <Divider
                    label={
                        <IconChevronDown
                            style={{
                                transform: !collapsed
                                    ? "rotate(180deg)"
                                    : undefined,
                            }}
                        />
                    }
                    labelPosition="right"
                    style={{ cursor: "pointer" }}
                    onClick={() => setCollapsed((prev) => !prev)}
                />
                <Collapse in={!collapsed}>
                    <Fieldset legend="Filters">
                        <Stack>
                            <Group>
                                <Switch
                                    label="NSFW"
                                    {...form.getInputProps("nfsw")}
                                />
                                <Fieldset legend="Categories" flex={1}>
                                    <ScrollArea w="100%">
                                        <Group>
                                            <ChipGroup>
                                                <Chip
                                                    checked={!form.values.genre}
                                                    onClick={() =>
                                                        form.setFieldValue(
                                                            "genre",
                                                            undefined,
                                                        )
                                                    }
                                                    color="red"
                                                    variant="light"
                                                >
                                                    <></>
                                                </Chip>
                                                {genres.map((g, i) => (
                                                    <Chip
                                                        key={g + i}
                                                        checked={
                                                            form.values
                                                                .genre === g
                                                        }
                                                        onChange={() =>
                                                            form.setFieldValue(
                                                                "genre",
                                                                g,
                                                            )
                                                        }
                                                    >
                                                        {g}
                                                    </Chip>
                                                ))}
                                            </ChipGroup>
                                        </Group>
                                    </ScrollArea>
                                </Fieldset>
                            </Group>
                        </Stack>
                    </Fieldset>
                </Collapse>
            </form>
            <Group>
                <ActionIconGroup>
                    <ActionIcon
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        <IconChevronLeft size={16} />{" "}
                    </ActionIcon>
                    <ActionIcon
                        onClick={() => {
                            if (elementsPerPage >= 50) setElementsPerPage(5);
                            else setElementsPerPage((prev) => prev + 5);
                        }}
                    >
                        {elementsPerPage}
                    </ActionIcon>
                    <ActionIcon
                        onClick={() =>
                            setPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={page === totalPages}
                    >
                        <IconChevronRight size={16} />{" "}
                    </ActionIcon>
                </ActionIconGroup>
                <Divider
                    flex={1}
                    label={
                        <Text fz="sm" c="dimmed">
                            Total: {beatmapsets?.length}
                        </Text>
                    }
                    labelPosition="left"
                />
            </Group>
            {isLoading ? (
                <SimpleGrid cols={{ md: 2, sm: 1 }}>
                    {Array(20)
                        .fill(0)
                        .map((_, i) => (
                            <Skeleton key={i} height={80} />
                        ))}
                </SimpleGrid>
            ) : (
                <SimpleGrid cols={{ md: 2, sm: 1 }}>
                    {paginatedBeatmapsets?.map((b, i) => (
                        <BeatmapSetCard key={b.title + i} beatmapset={b} />
                    ))}
                </SimpleGrid>
            )}
        </Stack>
    );
}
