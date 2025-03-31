import { config } from "dotenv";
config();
import { auth } from "osu-api-extended";

export const connect = async () => {
    try {
        await auth.login({
            type: "v2",
            client_id: process.env.CLIENT_ID!,
            client_secret: process.env.CLIENT_KEY!,
            scopes: ["public"],
        });
    } catch (error) {
        console.error(error);
    }
};
