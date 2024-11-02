import {
  Avatar,
  Card,
  Grid,
  Group,
  Image,
  Indicator,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { User } from "../../types";
import { openModal } from "@mantine/modals";
import { UserModalContent } from "./UserModal";

export default function UserCard({ user }: { user: User }) {
  function openUserModal() {
    openModal({
      title: user.username,
      children: <UserModalContent user={user} />,
      size: "lg",
    });
  }

  return (
    <Card
      bg={"dark"}
      onClick={openUserModal}
      radius={10}
      p={10}
      mah={250}
      pos={"relative"}
      style={{ cursor: "pointer" }}>
      <Grid>
        <Grid.Col span={3}>
          <Indicator
            position="top-start"
            color={user.is_online ? "lime" : "gray"}
            size={15}
            zIndex={0}>
            <Image src={user.avatar_url} alt="avatar-url" />
          </Indicator>
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
