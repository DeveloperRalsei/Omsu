import { AppShell, Button, Container, Group, Title } from "@mantine/core";
import axios from "axios";
import { ENV } from "./env";

export default function() {

   const osuBaseApiUrl = "https://osu.ppy.sh/p/api"
   const myOsuApiKey = ENV.client_secret

   const fetchOsuData = async () => {
      try {
         const response = await axios.post(`${osuBaseApiUrl}/get_beatmaps?k=${myOsuApiKey}`)   
         console.log(response)
      } 
      catch {
         
      }
   }

   return (
      <AppShell
         header={{height: 40}}     
      >
         <AppShell.Header>
            <Group h={"100%"} w={"100%"} align="center" justify="space-around">
               <Title order={2}>Omsu!</Title>
            </Group>
         </AppShell.Header>

         <AppShell.Main>
            <Container size={"md"}>
               <Button 
                  onClick={fetchOsuData}
               >
                  Fetch Osu Data :3
               </Button>
            </Container>
         </AppShell.Main>

         <AppShell.Footer>
            Made By Developer Ralsei
         </AppShell.Footer>
      </AppShell>
   )
}