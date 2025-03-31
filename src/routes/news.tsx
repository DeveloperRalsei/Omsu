import { SimpleGrid, Skeleton } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { NewsLetterCard } from "../componenets/newsletter/NewsLetterCard";
import { getNews } from "@/utils";

const pendingComponent = () => {
    return (
        <SimpleGrid cols={{ sm: 2, md: 3 }}>
            {Array(12)
                .fill(0)
                .map((_, index) => (
                    <Skeleton key={index} w={"100%"} h={300} />
                ))}
        </SimpleGrid>
    );
};

export const Route = createFileRoute("/news")({
    component: News,
    loader: getNews,
    pendingComponent,
});

function News() {
    const news = Route.useLoaderData();
    const year = new Date().getFullYear();
    const nLetterNames = [];

    for (let i = 0; i < news.length; i++) {
        nLetterNames[i] = news[i].edit_url.replace(
            `https://github.com/ppy/osu-wiki/tree/master/news/${year}/`,
            "",
        );
        news[i].edit_url = nLetterNames[i].replace(".md", "");
    }

    console.log(news, year);
    return (
        <SimpleGrid cols={{ sm: 2, md: 3 }}>
            {news.map((newsletter, index) => (
                <NewsLetterCard key={newsletter.id + index} n={newsletter} />
            ))}
        </SimpleGrid>
    );
}
