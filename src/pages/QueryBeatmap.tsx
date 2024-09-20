import { ActionIcon, SegmentedControl, Grid, Paper, SimpleGrid, Stack, TextInput, Image, Group, Pagination, Checkbox } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { nprogress } from "@mantine/nprogress";
import { BeatmapCard } from "../components/Cards";
import { IconSearch } from "@tabler/icons-react";
import { baseUrl } from '.';

export function QueryBeatmap() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [beatmaps, setBeatmaps] = useState([]);
  const [isFirstSearch, setIsFirstSearch] = useState<boolean>(true);
  const [activePage, setPage] = useState(1);
  const [isRanked, setIsRanked] = useState<boolean>(true)

  const itemsPerPage = 6;
  const totalPages = Math.ceil(beatmaps.length / itemsPerPage); 

  async function fetchOsuBeatmapData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    nprogress.start();
    setIsFirstSearch(false);

    try {
      const response = await axios.post(`${baseUrl}/api/fetch-beatmaps`, {
        q: searchValue || " ",
        isRanked
      });

      setBeatmaps(response.data.beatmapsets || []);
      nprogress.complete();
      console.log(beatmaps)
    } catch (error) {
      console.error(error);
      nprogress.complete();
    }
  }

  const paginatedBeatmaps = beatmaps.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <Stack mb={40}>
      <form onSubmit={fetchOsuBeatmapData}>
        <Grid columns={12}>
          <Grid.Col span={11}>
            <TextInput
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder="Query Beatmaps"
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <ActionIcon type="submit" w={"100%"}>
              <IconSearch />
            </ActionIcon>
          </Grid.Col>
        </Grid>

        <Paper p={"xs"} w={"100%"} withBorder mt={10}>
          <Group>
            <SegmentedControl
              data={[
                { label: <Image src={"/img/osu.png"} w={20} />, value: "osu" },
                { label: <Image src={"/img/osumania.png"} w={20} />, value: "mania" }
              ]}
              withItemsBorders={false}
            />
            <Checkbox checked={isRanked} label="Ranked" onChange={e => setIsRanked(e.target.checked)}/>
          </Group>
        </Paper>
      </form>

      <Group w={"100%"} justify="center">
        <Pagination total={totalPages} value={activePage} onChange={setPage} />
      </Group>

      <SimpleGrid cols={{ md: 2, sm: 1 }}>
        {isFirstSearch && "Search something to start"}
        {!beatmaps.length && !isFirstSearch && "Couldn't find anything 3:"}
        {paginatedBeatmaps.map((BMap: any) => {
          return <BeatmapCard key={BMap.id} beatmap={BMap} />;
        })}
      </SimpleGrid>
    </Stack>
  );
}
