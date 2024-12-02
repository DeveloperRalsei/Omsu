import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../App";
import { Newsletter } from "../types";
import { SimpleGrid, Skeleton, Space } from "@mantine/core";
import { NewsLetterCard } from "../ui/cards/NewsLetterCard";
import { nprogress } from "@mantine/nprogress";

const News = () => {
    const [news, setNews] = useState<Newsletter[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNews() {
            nprogress.start();
            try {
                const response = await axios.get(baseUrl + "/api/news");
                setNews(response.data);
                new Promise((resolve) => setTimeout(resolve, 3000));
                const news = response.data.news_posts;

                setNews(news);
                console.log(news);
            } catch (error) {
                console.error(error);
                showNotification({
                    message: "Something went wrong while loading newsletters",
                    color: "red",
                });
            }
            setLoading(false);
            nprogress.complete();
        }
        fetchNews();
    }, []);

    if (loading) {
        return (
            <SimpleGrid cols={{ sm: 2, md: 3 }}>
                {Array(12)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} w={"100%"} h={300} />
                    ))}
            </SimpleGrid>
        );
    }

    return (
        <SimpleGrid cols={{ sm: 2, md: 3 }}>
            {news.map((news, index) => (
                <NewsLetterCard key={news.id + index} n={news} />
            ))}
        </SimpleGrid>
    );
};
export default News;
