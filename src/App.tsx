import { ActionIcon, Anchor, AppShell, Box, Button, ButtonGroup, Container, Group, Title } from "@mantine/core";
import { author } from '../package.json';
import { IconChevronLeft, IconUsers } from "@tabler/icons-react";
import { useState } from "react";
import { Home, QueryUser, QueryBeatmap } from './pages';

type page = 'home' | 'fetchUser' | 'fetchBeatmap';

export default function () {
   const [page, setPage] = useState<page>("home");

   return (
      <AppShell
         header={{ height: 50 }}
      >
         <AppShell.Header>
            <Group w={"100%"} h={"100%"} align="center" justify="space-between" px={"sm"}>
               <Group>
                  {page !== 'home' && <ActionIcon onClick={() => setPage("home")} size={"lg"}>
                     <IconChevronLeft />
                  </ActionIcon>}
                  <ButtonGroup>
                     <Button leftSection={<IconUsers color="#fff" />} onClick={() => setPage("fetchUser")}>
                        Fetch Users
                     </Button>
                     <Button leftSection={<img src={"/img/osu.png"} alt="osu image" width={20} />} onClick={() => setPage("fetchBeatmap")} >
                        Fetch Beatmaps
                     </Button>
                  </ButtonGroup>
               </Group>
               <Title order={2}>Omsu!</Title>
               <Box />
            </Group>
         </AppShell.Header>

         <AppShell.Main>
            <Container size={"md"} mt={30}>
               {page === 'home' && <Home />}
               {page === 'fetchUser' && <QueryUser />}
               {page === 'fetchBeatmap' && <QueryBeatmap />}
            </Container>
         </AppShell.Main>

         <AppShell.Footer px={30}>
            <Group gap={5} w={"100%"} justify="end">
               Made By <Anchor href={author.url} target="_blank">
                  {author.name}
               </Anchor>
            </Group>
         </AppShell.Footer>
      </AppShell>
   );
}