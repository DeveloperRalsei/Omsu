import {
    Stack,
    Group,
    Title,
    Progress,
    Image,
    Text,
    useMantineTheme,
    LoadingOverlay,
} from "@mantine/core";
import { User } from "../../types";
import { baseUrl } from "../../App";
import { useEffect, useState } from "react";

async function getUserData(user: User) {
    try {
        const response = await fetch(`${baseUrl}/api/user/${user.id}`);

        if (!response.ok) {
            throw new Error("Nuh uh! NO user");
        }

        const data = await response.json();
    } catch (error) {
        console.error(error);
    }
    return user;
}

export const UsersOsu = ({ user }: { user: User }) => {
    const theme = useMantineTheme();
    const [fetchedUser, setFetchedUser] = useState<User | undefined>(undefined);
    useEffect(() => {
        async function fetchUserData() {
            const fetchedUser = await getUserData(user);
            setFetchedUser(fetchedUser);
        }
        fetchUserData();
    }, []);
    return (
        <Stack>
            {!fetchedUser && <LoadingOverlay visible={true} />}
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
                    {fetchedUser.playmode.charAt(0).toUpperCase() +
                        fetchedUser.playmode.slice(1)}
                    !
                </Text>
            </Group>

            <Group>
                <Title order={4}>Global Rank:</Title>
                <Text>#{fetchedUser.statistics.global_rank}</Text>
            </Group>

            <Stack>
                <Group justify="space-between" align="center">
                    <Group>
                        <Title order={4}>Level</Title>
                        <Text>{fetchedUser.statistics.level.current}</Text>
                    </Group>
                    <Text>{fetchedUser.statistics.level.progress}%</Text>
                </Group>
                <Progress
                    value={fetchedUser.statistics.level.progress}
                    color={theme.primaryColor}
                />
            </Stack>
        </Stack>
    );
};
