import { Button, Grid, Image, Stack, Text, Title } from "@mantine/core";
import { User } from "../../App";
import { IconExternalLink } from "@tabler/icons-react";

export function UserModalContent({user}: {user: User}) {
  return (
    <>
      <Grid>
        <Grid.Col span={3}>
          <Image src={user.avatar_url} radius="sm" alt="user-avatar" w={"100%"}/>
        </Grid.Col>
        <Grid.Col span={9}>
          <Stack>
            <Button component="a" target="_blank" href={`https://osu.ppy.sh/users/${user.id}`} rightSection={<IconExternalLink/>}>View User</Button>
            <Text>
              Status
            </Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  )
}