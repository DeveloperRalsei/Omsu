import {
    Stack,
    SimpleGrid,
    Text,
    Button,
    Fieldset,
    ActionIcon,
    TextInput,
    Group,
    Divider,
    ActionIconGroup,
    Switch,
    Select,
    Chip,
    ScrollArea,
    Collapse,
    Skeleton,
} from "@mantine/core";
import { createFileRoute, ErrorRouteComponent } from "@tanstack/react-router";
import { getBeatmapsets } from "@/utils";
import {
    IconAlertHexagon,
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
    IconChevronUp,
    IconSearch,
    IconX,
} from "@tabler/icons-react";
import BeatmapSetCard from "@/componenets/beatmap/BeatmapSetCard";
import { useForm } from "@mantine/form";
import { BeatmapFormValues, beatmapset } from "@/types";
import { FormEvent, useState } from "react";
import { beatmap_category } from "osu-api-extended";
import { useMutation } from "@tanstack/react-query";

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
    loader: () =>
        getBeatmapsets({
            q: "",
            mode: "osu",
            nfsw: false,
            sort: "ranked_asc",
            status: "ranked",
            categories: ["recommended", "spotlights", "follows"],
        }),

    pendingComponent: () => "loading...",
    errorComponent,
});

function QueryBeatmap() {
    const data = Route.useLoaderData();
    const [beatmapsets, setBeatmapsets] = useState<beatmapset[]>(data);
    const [page, setPage] = useState(1);
    const [elementsPerPage, setElementsPerPage] = useState(10);
    const [collapsed, setCollapsed] = useState(true);

    const categories: beatmap_category[] = [
        "spotlights",
        "converts",
        "follows",
        "featured_artists",
        "recommended",
    ];

    const form = useForm<BeatmapFormValues>({
        mode: "controlled",
        initialValues: {
            q: "",
            mode: "osu",
            status: "ranked",
            nfsw: false,
            sort: "ranked_asc",
            categories: ["recommended"],
        },
    });

    const totalPages = Math.ceil(beatmapsets.length / elementsPerPage);

    const paginatedBeatmapsets = beatmapsets.slice(
        (page - 1) * elementsPerPage,
        page * elementsPerPage,
    );

    const { mutate, isPending } = useMutation({
        mutationFn: () => getBeatmapsets(form.getValues()),
        onSuccess: (v) => {
            setBeatmapsets(v);
            setPage(1);
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
    };

    return (
        <Stack>
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
                label={collapsed ? <IconChevronUp /> : <IconChevronDown />}
                onClick={() => setCollapsed((prev) => !prev)}
            />
            <form onSubmit={handleSubmit}>
                <Collapse in={collapsed}>
                    <Fieldset legend="Filters">
                        <Stack>
                            <Group>
                                <Switch
                                    label="NSFW"
                                    {...form.getInputProps("nfsw")}
                                />
                                <Fieldset legend="Categories" flex={1}>
                                    <ScrollArea>
                                        <Group>
                                            {categories.map((c, i) => (
                                                <Chip
                                                    key={c + i}
                                                    checked={form.values.categories.includes(
                                                        c,
                                                    )}
                                                    onClick={() =>
                                                        form.setFieldValue(
                                                            "categories",
                                                            (p) =>
                                                                p.includes(c)
                                                                    ? p.filter(
                                                                          (
                                                                              item,
                                                                          ) =>
                                                                              item !==
                                                                              c,
                                                                      )
                                                                    : [...p, c],
                                                        )
                                                    }
                                                >
                                                    {c}
                                                </Chip>
                                            ))}
                                        </Group>
                                    </ScrollArea>
                                </Fieldset>
                            </Group>
                            <Select
                                label="Mode"
                                data={["osu", "taiko", "catch", "mania"]}
                                {...form.getInputProps("mode")}
                            />
                            <Select
                                label="Status"
                                data={[
                                    "ranked",
                                    "loved",
                                    "qualified",
                                    "approved",
                                ]}
                                {...form.getInputProps("status")}
                            />
                            <Button onClick={() => form.reset()}>
                                Reset Filters
                            </Button>
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
                            nya~
                        </Text>
                    }
                    labelPosition="left"
                />
                <Select
                    label="Sorting"
                    data={Object.keys(form.values.sort)}
                    {...form.getInputProps("sort")}
                />
            </Group>
            {isPending ? (
                <SimpleGrid cols={{ md: 2, sm: 1 }}>
                    {Array(20)
                        .fill(0)
                        .map((item, i) => (
                            <Skeleton height={40} />
                        ))}
                </SimpleGrid>
            ) : (
                <SimpleGrid cols={{ md: 2, sm: 1 }}>
                    {paginatedBeatmapsets.map((b, i) => (
                        <BeatmapSetCard key={b.title + i} beatmapset={b} />
                    ))}
                </SimpleGrid>
            )}
        </Stack>
    );
}
