import { ActionIcon, SegmentedControl, Grid, Paper, SimpleGrid, Stack, Text, TextInput, Image, Group } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { nprogress } from "@mantine/nprogress";
import { BeatmapCard } from "../components/Cards";
import { IconSearch } from "@tabler/icons-react";
import { baseUrl } from '.';

// const url = 'https://omsu-api.onrender.com/api';

export function QueryBeatmap() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [beatmaps, setBeatmaps] = useState([]);

  async function fetchOsuBeatmapData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    nprogress.start();

    try {
      const response = await axios.post(`${baseUrl}/api/fetch-beatmaps`, {
        q: searchValue || " "
      });

      setBeatmaps(response.data.beatmapsets || []);

      nprogress.complete();

      console.log(beatmaps);
    } catch (error) {
      console.error(error),
        nprogress.complete();
    }
  }

  return <Stack>
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
          <ActionIcon type="submit" w={"100%"}><IconSearch /></ActionIcon>
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
        </Group>
      </Paper>
    </form>

    <SimpleGrid cols={{ lg: 2, md: 1 }}>
      {beatmaps.map(BMap => {
        return <BeatmapCard beatmap={BMap} />;
      })}
    </SimpleGrid>
  </Stack>;
}