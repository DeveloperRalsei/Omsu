import { Button, Grid, SimpleGrid, Stack, TextInput } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { nprogress } from "@mantine/nprogress";

// const url = import.meta.env.DEV ? 'http://localhost:3000/api' : 'https://omsu-api.netlify.app/'
const url =  'https://omsu-api.netlify.app/'

export function QueryBeatmap() {
    const [searchValue, setSearchValue] = useState<string>("")

    async function fetchOsuBeatmapData() {
        nprogress.start()

        try {
            const response = await axios.post(`${url}/fetch-beatmaps`, {
                beatmapName: searchValue
            })

            console.log(response)
            nprogress.complete()
        } catch (error) {
            console.error(error),
            nprogress.complete()
        }
    }

    return <Stack>
        <Grid columns={12}>
            <Grid.Col span={10}>
                <TextInput 
                value={searchValue} 
                onChange={e => setSearchValue(e.target.value)}
                placeholder="Query Beatmaps"    
            />
            </Grid.Col>
            <Grid.Col span={2}>
                <Button fullWidth onClick={fetchOsuBeatmapData}>Query</Button>
            </Grid.Col>
        </Grid>

        <SimpleGrid cols={{ lg: 2, md: 1 }}>
        </SimpleGrid>
    </Stack>;
}