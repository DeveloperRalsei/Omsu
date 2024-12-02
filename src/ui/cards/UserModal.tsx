import {
    Button,
    Grid,
    Group,
    Image,
    LoadingOverlay,
    Progress,
    Stack,
    Text,
    Title,
    useMantineTheme,
} from "@mantine/core";
import { User } from "../../types";
import { IconExternalLink } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { baseUrl } from "../../App";

export function UserModalContent({ user }: { user: User }) {
    const [fetchedUser, setFUser] = useState<User>();
    const [loading, setLoading] = useState<boolean>(false);
    const theme = useMantineTheme();

    useEffect(() => {
        async function fetchUserData() {
            setLoading(true);
            try {
                const response = await fetch(`${baseUrl}/api/user/${user.id}`);

                if (!response.ok) {
                    throw new Error("Nuh uh! NO user");
                }

                const data = await response.json();

                if (import.meta.env.DEV) console.log(data);
                setFUser(data);

                if (import.meta.env.DEV) console.log(await response.json());
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, []);

    return (
        <Stack>
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
                    {fetchedUser ? (
                        <Stack>
                            <Group>
                                <Title order={4}>
                                    <Group>
                                        Play Mode:{" "}
                                        <Image
                                            src={`/img/${fetchedUser.playmode}.png`}
                                            alt="playmode"
                                            w={20}
                                        />
                                    </Group>
                                </Title>
                                <Text>
                                    {fetchedUser.playmode
                                        .charAt(0)
                                        .toUpperCase() +
                                        fetchedUser.playmode.slice(1)}
                                    !
                                </Text>
                            </Group>

                            <Group>
                                <Title order={4}>Global Rank:</Title>
                                <Text>
                                    #{fetchedUser.statistics.global_rank}
                                </Text>
                            </Group>

                            <Stack>
                                <Group justify="space-between" align="center">
                                    <Group>
                                        <Title order={4}>Level</Title>
                                        <Text>
                                            {
                                                fetchedUser.statistics.level
                                                    .current
                                            }
                                        </Text>
                                    </Group>
                                    <Text>
                                        {fetchedUser.statistics.level.progress}%
                                    </Text>
                                </Group>
                                <Progress
                                    value={
                                        fetchedUser.statistics.level.progress
                                    }
                                    color={theme.primaryColor}
                                />
                            </Stack>
                        </Stack>
                    ) : (
                        <LoadingOverlay
                            visible={loading}
                            overlayProps={{ blur: 0, bg: "transparent" }}
                        />
                    )}
                </Grid.Col>
                {loading ? (
                    ""
                ) : (
                    <Stack w={"100%"}>
                        <Button
                            w={"100%"}
                            component="a"
                            href={`https://osu.ppy.sh/users/${fetchedUser?.id}`}
                            target="_blank"
                            rightSection={<IconExternalLink />}>
                            View User
                        </Button>
                    </Stack>
                )}
            </Grid>
        </Stack>
    );
}

export default { minecraft: "What the hell I'm doing" };
