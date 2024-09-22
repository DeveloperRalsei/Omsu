import { Stack, Button, ScrollArea, Group, Badge, Text, Image } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { beatmapset } from "../../App";

type BeatmapSetModalContentProps = {
  beatmapset: beatmapset
}

export function BeatmapsetSetModalContent({ beatmapset }: BeatmapSetModalContentProps) {

  const beatmapsetTags = beatmapset.tags.split(" ");

  return (
    <Stack>
      <Button variant="light" component="a" target="_blank" rightSection={<IconExternalLink />} href={`https://osu.ppy.sh/beatmapsets/${beatmapset.id}`}>View the beatmapset</Button>
      <Image w={"100%"} src={beatmapset.covers["card@2x"]} alt="beatmapsetCard" radius={"sm"} />
      <ScrollArea h={"30vh"}>
        <Group>
          <Text>Beatmapset Creator: </Text>
          <Text>{beatmapset.creator}</Text>
        </Group>
        <Group>
          <Text>Beatmapset Status: </Text>
          <Badge
            color={
              beatmapset.ranked == -2 && "gray" ||
              beatmapset.ranked == -1 && "lime" ||
              beatmapset.ranked == 0 && "violet" ||
              beatmapset.ranked == 1 && "yellow" ||
              beatmapset.ranked == 2 && "cyan" ||
              beatmapset.ranked == 3 && "lime" ||
              beatmapset.ranked == 4 && "pink" ||
              "lime"
            }
          >{beatmapset.status}</Badge>
        </Group>
        <Group mb={50}>
          <Text>Beatmapset Tags: </Text>
          <Group>
            {beatmapsetTags.map((tag, i) => (
              <Badge component="a" href={`https://osu.ppy.sh/beatmapsetsets?q=${tag}`} target="_blank" style={{ cursor: "pointer" }} variant="light" key={i}>{tag}</Badge>
            ))}
          </Group>
        </Group>
      </ScrollArea>
    </Stack>
  );
}