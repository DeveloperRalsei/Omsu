import { ActionIcon, ActionIconGroup, Anchor, AppShell, Box, Button, ButtonGroup, Container, Flex, Group, Image, Loader, LoadingOverlay, ScrollArea, Space, Stack, Text, Title } from "@mantine/core";
import { author } from '../package.json';
import { IconChevronLeft, IconQuestionMark, IconUsers } from "@tabler/icons-react";
import { useEffect, useState, useTransition } from "react";
import { Home, QueryUser, QueryBeatmap, baseUrl } from './pages';
import './styles.css';
import { openModal } from "@mantine/modals";
import HelpDocument from '../documents/WhatIsThis.mdx';
import { useMdxComps } from "./hooks/useMdxComps";
import axios from "axios";
import { notifications, showNotification } from "@mantine/notifications";

type page = 'home' | 'fetchUser' | 'fetchBeatmap';

export default function () {
   const [page, setPage] = useState<page>("home");
   const [isPending, startTransition] = useTransition();
   const components = useMdxComps();
   const [pingData, setPingData] = useState<any>();

   useEffect(() => {
      axios.get(baseUrl + "/api/ping")
         .then(res => {
            setPingData(res.data);
            showNotification({
               message: "Connected API :3"
            });
         })
         .catch(err => {
            console.error(err);
            showNotification({
               message: "Something went wrong while connection api (:/). Please check your internet connection and refresh the page",
               color: "red",
               autoClose: 5000
            });
         });
   }, []);

   return (
      <AppShell
         header={{ height: 50 }}
         pos={"relative"}
      >
         <LoadingOverlay
            visible={!pingData}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ type: 'bars' }}
         />
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
               <Group>
                  <ActionIcon onClick={() => {
                     openModal({
                        title: <Title order={2}>What is Omsu?</Title>,
                        children: <HelpDocument components={components} />,
                        size: "lg"
                     });
                  }}>
                     <IconQuestionMark />
                  </ActionIcon>
               </Group>
            </Group>
         </AppShell.Header>

         <AppShell.Main>
            <Container size={"md"} >
               <Space h={30} />
               {page === 'home' && <Flex justify={"center"}>
                  <Group>
                     <Image src={"/img/logo.png"} alt="Logo" w={80} />
                     <Title>Welcome to Omsu!</Title>
                  </Group>
               </Flex>}
               <Title order={1} ta="center">
                  {page === 'fetchBeatmap' && "Beatmaps"}
                  {page === 'fetchUser' && "Users"}
               </Title>
               <Space h={30} />
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