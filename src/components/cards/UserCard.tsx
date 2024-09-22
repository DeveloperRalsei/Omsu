import { Avatar, Card, Grid, Group, Image, Indicator, Stack, Text, Title } from "@mantine/core";
import { User } from "../../App";

export default function UserCard({user}: {user: User}) {
  return (
    <Card bg={"dark"} radius={10} p={10} mah={250} pos={"relative"} style={{ cursor: "pointer" }}>
      <Grid>
        <Grid.Col span={3}>
          <Image src={user.avatar_url} alt="avatar-url" />
        </Grid.Col>
        <Grid.Col span={9}>
          <Stack justify="space-between" h={"100%"} pb={5}>
            <Title order={3}>{user.username}</Title>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
}