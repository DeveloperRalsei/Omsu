import { Paper, Title, Text } from "@mantine/core";
import React from "react";

export default function HomeCard({ title, children }: { title?: string, children?: React.ReactNode; }) {
  return (
    <Paper bg={"dark"} radius={10} p={20} withBorder shadow="lg">
      {title && <Title order={3} ta={"center"} >
        {title}
      </Title>}
      <Text>
        {children}
      </Text>
    </Paper>
  );
}

