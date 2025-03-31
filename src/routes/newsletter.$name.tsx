import { getNewsletter } from "@/utils";
import { Space, Text, Title, TypographyStylesProvider } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import matter from "front-matter";
import MarkDown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export const Route = createFileRoute("/newsletter/$name")({
    component: RouteComponent,
});

function RouteComponent() {
    const { name } = Route.useParams();

    const {
        data: Newsletter,
        isPending,
        isError,
        error,
    } = useQuery({
        queryFn: () => getNewsletter(name),
        queryKey: ["news" + name],
    });

    if (isError) {
        showNotification({
            message: "Something went wrong",
            color: "red",
        });
        return JSON.stringify(error);
    }

    if (isPending) {
        return "loading...";
    }

    const {
        body,
        attributes: { date, title },
    } = matter<{ title: string; date: string; layout: string }>(Newsletter!);

    return (
        <TypographyStylesProvider>
            <Title order={1}>{title}</Title>
            <Text c="dimmed" fz="sm">
                {new Date(date).toLocaleDateString()}
            </Text>
            <MarkDown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {body}
            </MarkDown>
            <Space h={"5vh"} />
        </TypographyStylesProvider>
    );
}
