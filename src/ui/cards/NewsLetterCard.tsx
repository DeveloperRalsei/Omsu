import { Card, Image, Paper, Title } from "@mantine/core";
import { Newsletter } from "../../types";
import { usePage } from "../context/PageContext";

export const NewsLetterCard = ({ n }: { n: Newsletter }) => {
    const { setPage } = usePage();

    return (
        <Card
            w={"100%"}
            p={"md"}
            withBorder
            style={{ cursor: "pointer" }}
            onClick={() => {
                setPage("newsletter", n.id.toString());
            }}>
            <Card.Section>
                <Image src={n.first_image} alt="cover-image" height={200} />
            </Card.Section>
            <Card.Section p={"sm"}>
                <Title order={4}>{n.title}</Title>
                <p>{n.preview}</p>
            </Card.Section>
        </Card>
    );
};
