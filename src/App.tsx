import { ActionIcon, ActionIconGroup, Anchor, AppShell, Box, Button, ButtonGroup, Container, Group, Loader, ScrollArea, Stack, Title } from "@mantine/core";
import { author } from '../package.json';
import { IconChevronLeft, IconQuestionMark, IconUsers } from "@tabler/icons-react";
import { useState, useTransition } from "react";
import { Home, QueryUser, QueryBeatmap } from './pages';
import './styles.css';
import { openModal } from "@mantine/modals";
import HelpDocument from '../documents/WhatIsThis.mdx'
import { useMdxComps } from "./hooks/useMdxComps";

type page = 'home' | 'fetchUser' | 'fetchBeatmap';

export default function () {
   const [page, setPage] = useState<page>("home");
   const [isPending, startTransition] = useTransition();
   const components = useMdxComps()

   return (
      <AppShell
         header={{ height: 50 }}
      >
         <AppShell.Header>
            <Group w={"100%"} h={"100%"} align="center" justify="space-between" px={"sm"}>
               <Group>
                  {page !== 'home' && <ActionIcon onClick={() => startTransition(() => setPage("home"))} size={"lg"}>
                     <IconChevronLeft />
                  </ActionIcon>}
                  <ButtonGroup visibleFrom="sm">
                     <Button leftSection={<IconUsers color="#fff" />} onClick={() => startTransition(() => setPage("fetchUser"))}>
                        Fetch Users
                     </Button>
                     <Button leftSection={<img src={"/img/osu.png"} alt="osu image" width={20} />} onClick={() => startTransition(() => setPage("fetchBeatmap"))} >
                        Fetch Beatmaps
                     </Button>
                  </ButtonGroup>
                  <Group hiddenFrom="sm">
                     <ActionIcon hiddenFrom="sm" size={"lg"} onClick={() => startTransition(() => setPage("fetchUser"))}>
                        <IconUsers />
                     </ActionIcon>
                     <ActionIcon hiddenFrom="sm" size={"lg"} onClick={() => startTransition(() => setPage("fetchBeatmap"))}>
                        <img src={"/img/osu.png"} alt="osu image" width={20} />
                     </ActionIcon>
                  </Group>
               </Group>
               <Title order={2}>Omsu!</Title>
               <ActionIcon onClick={() => {
                  openModal({
                     title: <Title order={2}>What is Omsu?</Title>,
                     children: <HelpDocument components={components}/>,
                     size: "lg"
                  })
               }}>
                  <IconQuestionMark />
               </ActionIcon>
            </Group>
         </AppShell.Header>

         <AppShell.Main>
            <Container size={"md"} mt={30}>
               {isPending ? (
                  <Stack>
                     <Loader type="bars" />
                  </Stack>
               ) : (
                  <Stack>
                     {page === 'home' && <Home />}
                     {page === 'fetchUser' && <QueryUser />}
                     {page === 'fetchBeatmap' && <QueryBeatmap />}
                  </Stack>
               )}
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