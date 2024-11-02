import {
  Stack,
  Grid,
  TextInput,
  Flex,
  ActionIcon,
  Fieldset,
  Group,
  Checkbox,
  Box,
  DEFAULT_THEME,
  Pagination,
  SimpleGrid,
} from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import { BeatmapSetCard, UserCard } from "../ui/cards";
import { FormEvent, useState } from "react";
import { baseUrl } from ".";
import axios from "axios";
import { nprogress } from "@mantine/nprogress";
import { showNotification } from "@mantine/notifications";
import { User } from "../types";

export function QueryUser() {
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
        baseUrl + "/api/search-user?" + searchParams
      );

      nprogress.complete();

      setUsers(response.data.user.data);

      if (import.meta.env.DEV) {
        console.log(response.data.user.data);
      }
    } catch (error) {
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
        <Grid columns={12}>
          <Grid.Col span={10}>
            <TextInput
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Query Beatmaps"
              autoFocus
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <Flex w={"100%"} gap={8}>
              <ActionIcon w={"100%"} type="submit">
                <IconSearch />
              </ActionIcon>
              <ActionIcon type="reset" w={"100%"} onClick={clearAction}>
                <IconX />
              </ActionIcon>
            </Flex>
          </Grid.Col>
        </Grid>
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
