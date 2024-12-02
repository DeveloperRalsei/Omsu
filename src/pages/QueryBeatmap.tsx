import {
    ActionIcon,
    Grid,
    SimpleGrid,
    Stack,
    TextInput,
    Group,
    Pagination,
    Checkbox,
    Text,
    DEFAULT_THEME,
    Box,
    Fieldset,
    Flex,
    Skeleton,
} from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { nprogress } from "@mantine/nprogress";
import { BeatmapSetCard } from "../ui/cards";
import { IconSearch, IconX } from "@tabler/icons-react";
import { baseUrl } from "../App";
import { showNotification } from "@mantine/notifications";
import { beatmapset } from "../types";

function QueryBeatmap() {
    const [searchValue, setSearchValue] = useState<string>("");
    const [beatmaps, setBeatmaps] = useState([]);
    const [isFirstSearch, setIsFirstSearch] = useState<boolean>(true);
    const [activePage, setPage] = useState(1);
    const [isRanked, setIsRanked] = useState<boolean>(true);
    const [loading, setLoading] = useState(false);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(beatmaps.length / itemsPerPage);

    async function fetchOsuBeatmapData(e: React.FormEvent<HTMLFormElement>) {
        setLoading(true);
        e.preventDefault();
        nprogress.start();
        setIsFirstSearch(false);
        setBeatmaps([]);

        try {
            const response = await axios.get(
                `${baseUrl}/api/fetch-beatmaps?q=${searchValue}&isRanked=${isRanked}`
            );

            setBeatmaps(response.data.beatmapsets || [{}]);

            if (import.meta.env.DEV) {
                console.log(response.data.beatmapsets);
            }
        } catch (error) {
            console.error(error);
            nprogress.complete();
            showNotification({
                message:
                    "Something went wrong while trying to connect api 😿️. Please check your internet connection and refresh page",
            });
        }

        nprogress.complete();
        setLoading(false);
    }

    const paginatedBeatmaps = beatmaps.slice(
        (activePage - 1) * itemsPerPage,
        activePage * itemsPerPage
    );

    const clearAction = () => {
        setSearchValue("");
        setBeatmaps([]);
    };

    return (
        <Stack mb={40}>
            <form onSubmit={fetchOsuBeatmapData}>
                <Group align={"center"} w={"100%"}>
                    <TextInput
                        value={searchValue}
                        flex={1}
                        rightSection={<IconX onClick={clearAction} />}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Query Beatmaps"
                        autoFocus
                    />
                    <ActionIcon type="submit">
                        <IconSearch />
                    </ActionIcon>
                </Group>

                <Fieldset legend="FILTER" p={"xs"} w={"100%"} mt={10}>
                    <Group>
                        <Checkbox
                            checked={isRanked}
                            label="Ranked"
                            onChange={(e) => setIsRanked(e.target.checked)}
                        />
                        <Box>
                            NOTE:{" "}
                            <Text c={"dimmed"}>
                                I'm working on fetching unranked beatmaps
                            </Text>
                        </Box>
                    </Group>
                </Fieldset>
            </form>

            <Group w={"100%"} justify="center">
                <Pagination
                    total={totalPages}
                    value={activePage}
                    onChange={setPage}
                />
            </Group>

            <SimpleGrid cols={{ md: 2, sm: 1 }}>
                {loading && (
                    <>
                        {Array(10)
                            .fill(0)
                            .map((_, i) => (
                                <Skeleton key={i} h={100} w={"100%"} />
                            ))}
                    </>
                )}
                {isFirstSearch && "Search something to start"}
                {paginatedBeatmaps.map((BMapSet: beatmapset) => {
                    return (
                        <BeatmapSetCard key={BMapSet.id} beatmapset={BMapSet} />
                    );
                })}
            </SimpleGrid>
        </Stack>
    );
}
export default QueryBeatmap;
