import { Stack, TypographyStylesProvider } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

export const Route = createFileRoute("/updates")({
    component: RouteComponent,
});

function RouteComponent() {
    const [md, setMd] = useState<string | null>(null);

    useEffect(() => {
        fetch("../../docs/updates.md")
            .then((res) => res.text())
            .then((text) => setMd(text));
    }, []);

    return (
        <Stack>
            <TypographyStylesProvider>
                <Markdown>{md}</Markdown>
            </TypographyStylesProvider>
        </Stack>
    );
}
