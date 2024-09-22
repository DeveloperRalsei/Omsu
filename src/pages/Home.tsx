import { Grid, List, NumberFormatter } from "@mantine/core";
import { HomeCard } from "../components/cards";

export function Home() {
    return (
        <>
            <Grid>
                <Grid.Col span={{ lg: 8, md: 12 }}>
                    <HomeCard title="Home Card">
                        Home Card Content
                    </HomeCard>
                </Grid.Col>
                <Grid.Col span={{ lg: 4, md: 12 }}>
                    <HomeCard>
                        <List listStyleType="none">
                            <List.Item>
                                Current Online Players : <NumberFormatter thousandSeparator value={1231}/>
                            </List.Item>
                        </List>
                    </HomeCard>
                </Grid.Col>
            </Grid>
        </>
    );
}