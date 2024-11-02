import {
  Text,
  Badge,
  Button,
  Grid,
  Group,
  Image,
  Loader,
  Stack,
  Title,
  Indicator,
  Accordion,
  ScrollArea,
} from "@mantine/core";
import { beatmapset } from "../../types";
import { useEffect, useState } from "react";
import { baseUrl } from "../../pages";
import { IconExternalLink } from "@tabler/icons-react";
import { BeatmapCard } from "./BeatmapCard";

export function BeatmapsetSetModalContent({
  beatmapset,
}: {
  beatmapset: beatmapset;
}) {
  const [loading, setLoading] = useState(false);
  const [fetchedBeatmapset, setFetchedBeatmapset] = useState<beatmapset>();

  useEffect(() => {
    async function fetchBeatmapset() {
      setLoading(true);

      try {
        const response = await fetch(
          `${baseUrl}/api/beatmapset/${beatmapset.id}`
        );

        if (!response.ok) {
          throw new Error("Nuh uh! NO beatmapset");
        }

        const data = await response.json();

        setFetchedBeatmapset(data);

        if (import.meta.env.DEV) console.log(fetchedBeatmapset);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBeatmapset();
  }, []);

  if (loading || !fetchedBeatmapset)
    return (
      <Group w={"100%"}>
        <Loader />
      </Group>
    );

  const statusColor =
    (fetchedBeatmapset.ranked == -2 && "gray") ||
    (fetchedBeatmapset.ranked == -1 && "lime") ||
    (fetchedBeatmapset.ranked == 0 && "violet") ||
    (fetchedBeatmapset.ranked == 1 && "yellow") ||
    (fetchedBeatmapset.ranked == 2 && "cyan") ||
    (fetchedBeatmapset.ranked == 3 && "lime") ||
    (fetchedBeatmapset.ranked == 4 && "pink") ||
    "lime";

  return (
    <Stack>
      <Grid>
        <Grid.Col span={{ lg: 4, xs: 12 }}>
          <Stack>
            <Image
              visibleFrom="lg"
              src={fetchedBeatmapset!.covers["list@2x"]}
              alt="beatmapset-card"
              radius="sm"
              w={"100%"}
            />
            <Image
              hiddenFrom="lg"
              src={fetchedBeatmapset!.covers["card@2x"]}
              alt="beatmapset-card"
              radius="sm"
              w={"100%"}
            />
            <Button
              component="a"
              href={`https://osu.ppy.sh/beatmapsets/${fetchedBeatmapset.id}`}
              target="_blank"
              rightSection={<IconExternalLink size={18} />}>
              View Beatmapset
            </Button>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ lg: 8, xs: 12 }}>
          <ScrollArea h={"35vh"}>
            <Stack>
              <Group>
                <Text>Beatmapset Status: </Text>
                <Badge variant="light" color={statusColor}>
                  {fetchedBeatmapset.status}
                </Badge>
              </Group>
              <Accordion variant="separated">
                <Accordion.Item value="beatmaps">
                  <Accordion.Control>
                    Beatmaps ({fetchedBeatmapset.beatmaps.length})
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Stack>
                      {fetchedBeatmapset.beatmaps.map((beatmap) => (
                        <BeatmapCard beatmap={beatmap} key={beatmap.id} />
                      ))}
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Stack>
          </ScrollArea>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
