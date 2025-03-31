import { Button, Container, Stack, Text, Title } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";
import { ErrorRouteComponent } from "@tanstack/react-router";

export const ErrorComponent: ErrorRouteComponent = (e) => {
    console.error(e);
    return (
        <Stack component={Container}>
            <Title order={2} c="red">
                Error
            </Title>
            <Title order={4}>{e.error.name}</Title>
            <Text>{e.error.message}</Text>
            <Button onClick={e.reset} rightSection={<IconReload />}>
                Reload Page
            </Button>
        </Stack>
    );
};
