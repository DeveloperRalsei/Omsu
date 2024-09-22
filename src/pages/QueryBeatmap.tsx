import { ActionIcon, Grid, SimpleGrid, Stack, TextInput, Group, Pagination, Checkbox, Text, DEFAULT_THEME, Box, Fieldset, Flex } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { nprogress } from "@mantine/nprogress";
import { BeatmapSetCard } from "../components/cards";
import { IconSearch, IconX } from "@tabler/icons-react";
import { baseUrl } from '.';
import { showNotification } from "@mantine/notifications";

export function QueryBeatmap() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [beatmaps, setBeatmaps] = useState([]);
  const [isFirstSearch, setIsFirstSearch] = useState<boolean>(true);
  const [activePage, setPage] = useState(1);
  const [isRanked, setIsRanked] = useState<boolean>(true);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(beatmaps.length / itemsPerPage);

  async function fetchOsuBeatmapData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    nprogress.start();
    setIsFirstSearch(false);

    try {
      const response = await axios.get(`${baseUrl}/api/fetch-beatmaps?q=${searchValue}&isRanked=${isRanked}` );
      
      setBeatmaps(response.data.beatmapsets || []);
      nprogress.complete();
      
      if(import.meta.env.DEV) {
        console.log(response.data.beatmapsets);
      }

    } catch (error) {
      console.error(error);
      nprogress.complete();
      showNotification({
        message: "Something went wrong while trying to connect api 😿️. Please check your internet connection and refresh page"
      });
    }
  }

  const paginatedBeatmaps = beatmaps.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const clearAction = () => {
    setSearchValue("")
    setBeatmaps([])
  }

  return (
    <Stack mb={40}>
      <form onSubmit={fetchOsuBeatmapData}>
        <Grid columns={12}>
          <Grid.Col span={10}>
            <TextInput
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder="Query Beatmaps"
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <Flex w={"100%"} gap={8}>
              <ActionIcon w={"100%"} type="submit">
                <IconSearch />
              </ActionIcon>
              <ActionIcon type="reset" w={"100%"} onClick={clearAction}>
                <IconX />
              </ActionIcon>
            </Flex>
          </Grid.Col>
        </Grid>

        <Fieldset legend="FILTER" p={"xs"} w={"100%"} mt={10}>
          <Group>
            <Checkbox checked={isRanked} label="Ranked" onChange={e => setIsRanked(e.target.checked)} />
            <Box>
              NOTE: <Text c={DEFAULT_THEME.colors.gray[5]}>I'm working on fetching unranked beatmaps</Text>
            </Box>
          </Group>
        </Fieldset>
      </form>

      <Group w={"100%"} justify="center">
        <Pagination total={totalPages} value={activePage} onChange={setPage} />
      </Group>

      <SimpleGrid cols={{ md: 2, sm: 1 }}>
        {isFirstSearch && "Search something to start"}
        {!beatmaps.length && !isFirstSearch && "Couldn't find anything 3:"}
        {paginatedBeatmaps.map((BMapSet: any) => {
          return <BeatmapSetCard key={BMapSet.id} beatmapset={BMapSet} />;
        })}
      </SimpleGrid>
    </Stack>
  );
}
