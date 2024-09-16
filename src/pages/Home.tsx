import { Grid, Paper, Text, Title } from "@mantine/core";
import { HomeCard } from "../components/Cards";

export function Home() {
    return (
        <>
            <Grid columns={12}>
                <Grid.Col span={{ lg: 7, md: 12 }}>
                    <HomeCard title="Home Card">
                        Home Card Content
                    </HomeCard>
                </Grid.Col>
                <Grid.Col span={{ lg: 5, md: 12 }}>
                    <HomeCard>
                        Second Card Content
                    </HomeCard>
                </Grid.Col>
            </Grid>
        </>
    );
}