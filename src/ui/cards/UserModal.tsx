import { Button, Grid, Image, Stack, Text, Title } from "@mantine/core";
import { User } from "../../App";
import { IconExternalLink } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { baseUrl } from "../../pages";
import { nprogress } from "@mantine/nprogress";

export function UserModalContent({ user }: { user: User }) {
  const [fetchedUser, setFUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUserData() {
      nprogress.start();
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/api/user/${user.id}`);

        if (!response.ok) {
          throw new Error("Nuh uh! NO user");
        }

        const data = await response.json();

        if (import.meta.env.DEV) console.log(await response.json());
      } catch (error) {
        console.error(error);
      } finally {
        nprogress.complete();
      }
    }

    fetchUserData();
  }, []);

  return (
    <>
      <Grid>
        <Grid.Col span={3}>
          <Image
            src={user.avatar_url}
            radius="sm"
            alt="user-avatar"
            w={"100%"}
          />
        </Grid.Col>
        <Grid.Col span={9}>
          <Stack>
            <Button
              component="a"
              target="_blank"
              href={`https://osu.ppy.sh/users/${user.id}`}
              rightSection={<IconExternalLink />}>
              View User
            </Button>

            <Text>Status</Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default { minecraft: "What the hell I'm doing" };
