import { Card, Image, Title } from "@mantine/core";
import { Newsletter } from "../../types";
import { Link } from "@tanstack/react-router";

export const NewsLetterCard = ({ n }: { n: Newsletter }) => {
    return (
        <Card
            w={"100%"}
            p={"md"}
            withBorder
            style={{ cursor: "pointer" }}
            component={Link}
            to={`/newsletter/${n.edit_url}`}
        >
            <Card.Section>
                <Image
                    src={n.first_image}
                    loading="eager"
                    alt="cover-image"
                    height={200}
                />
            </Card.Section>
            <Card.Section p={"sm"}>
                <Title order={4}>{n.title}</Title>
                <p>{n.preview}</p>
            </Card.Section>
        </Card>
    );
};
