import {
    Stack,
    Group,
    TextInput,
    ActionIcon,
    Flex,
    Pagination,
    SimpleGrid,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { nprogress } from "@mantine/nprogress";
import { IconX, IconSearch } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useState, FormEvent } from "react";
import UserCard from "../componenets/users/UserCard";
import { User } from "../types";

export const Route = createFileRoute("/users")({
    component: QueryUser,
});

function QueryUser() {
    const [searchValue, setSearchValue] = useState<string>("");
    const [pageValue, setPageValue] = useState(1);
    const [users, setUsers] = useState<User[]>([]);

    async function fetchUsers(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        nprogress.start();

        const searchParams = new URLSearchParams({
            q: searchValue,
            page: pageValue.toString(),
        });

        try {
            const response = await axios.get(
                "/api/search-user?" + searchParams,
            );

            nprogress.complete();

            setUsers(response.data.user.data);

            if (import.meta.env.DEV) {
                console.log(response.data.user.data);
            }
        } catch (error) {
            console.log(error);
            showNotification({
                message:
                    "Something went wrong while trying to connect api 😿️. Please check your internet connection and refresh page",
            });
            nprogress.complete();
        }
    }

    function clearAction() {
        setSearchValue("");
        setUsers([]);
    }

    return (
        <Stack mb={40}>
            <form onSubmit={fetchUsers}>
                <Group w={"100%"}>
                    <TextInput
                        value={searchValue}
                        flex={1}
                        onChange={(e) => setSearchValue(e.target.value)}
                        rightSection={<IconX onClick={clearAction} />}
                        placeholder="Query Beatmaps"
                        autoFocus
                    />
                    <ActionIcon type="submit">
                        <IconSearch />
                    </ActionIcon>
                </Group>
            </form>

            <Flex justify={"center"}>
                <Pagination total={1} />
            </Flex>

            <SimpleGrid cols={{ md: 2, sm: 1 }} mt={30}>
                {users.length == 0 && "There's no user to show 3:"}
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </SimpleGrid>
        </Stack>
    );
}
