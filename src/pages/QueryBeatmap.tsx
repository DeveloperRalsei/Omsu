import { ActionIcon, Button, Grid, SimpleGrid, Stack, TextInput } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { nprogress } from "@mantine/nprogress";
import { BeatmapCard } from "../components/Cards";
import { IconSearch } from "@tabler/icons-react";

const url = import.meta.env.DEV ? 'http://localhost:3000/api' : 'https://omsu-api.onrender.com/api'
// const url = 'https://omsu-api.onrender.com/api';

export function QueryBeatmap() {
    const [searchValue, setSearchValue] = useState<string>("");
    const [beatmaps, setBeatmaps] = useState([]);

    async function fetchOsuBeatmapData(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        nprogress.start();

        try {
            const response = await axios.get(`${url}/fetch-beatmaps?q=${searchValue || " "}`);

            setBeatmaps(response.data.beatmapsets || []);
            
            nprogress.complete();

            console.log(beatmaps)
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
                    <ActionIcon  type="submit"><IconSearch/></ActionIcon>
                </Grid.Col>
            </Grid>
        </form>

        <SimpleGrid cols={{ lg: 2, md: 1 }}>
            {beatmaps.map(BMap => {
                return <BeatmapCard beatmap={BMap} />;
            })}
        </SimpleGrid>
    </Stack>;
}