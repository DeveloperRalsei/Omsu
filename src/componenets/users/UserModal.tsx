import { Grid, Image, LoadingOverlay, Stack } from "@mantine/core";
import { User } from "../../types";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../App";
import { showNotification } from "@mantine/notifications";

export function UserModalContent({ user }: { user: User }) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await axios.get(`${baseUrl}/api/user/${user.id}`);
                console.log(res.data);
            } catch (error) {
                showNotification({
                    color: "red",
                    message: "Something went wrong 😿",
                });
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    return (
        <Stack>
            {loading && <LoadingOverlay />}
            <Grid>
                <Grid.Col span={3}>
                    <Image
                        src={user.avatar_url}
                        radius="sm"
                        alt="user-avatar"
                        w={"100%"}
                    />
                </Grid.Col>
                <Grid.Col span={9}></Grid.Col>
            </Grid>
        </Stack>
    );
}

export default { minecraft: "What the hell I'm doing" };
