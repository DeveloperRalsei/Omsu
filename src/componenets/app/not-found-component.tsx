import { NotFoundRouteComponent } from "@tanstack/react-router";

import { Button, Stack, Title } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";

export const NotFoundComponent: NotFoundRouteComponent = (e) => {
    console.warn(e);
    return (
        <Stack>
            <Title order={2} c="red">
                404
            </Title>
            <Button component="a" href="/" rightSection={<IconHome />}>
                Back to HomePage
            </Button>
        </Stack>
    );
};
