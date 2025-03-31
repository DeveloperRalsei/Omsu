import express from "express";
import cors from "cors";
import { config } from "dotenv";

config();
await connect().catch((err) => {
    console.error(err);
    process.exit(1);
});
console.log("API Connection successful");

if (!process.env.CLIENT_ID || !process.env.CLIENT_KEY || !process.env.PORT) {
    console.error("Please provide a CLIENT_ID, CLIENT_KEY and a PORT");
    process.exit(1);
}

import { beatmapRoutes, userRoutes, pingRoute, newsRoutes } from "./routes";
import { connect } from "./service/osu-api";

const api = express();

api.use(express.json(), cors());
api.use((req, _, next) => {
    console.log(req.ip, req.url, req.query, req.method);
    next();
});

api.use("/ping", pingRoute);
api.use("/", beatmapRoutes);
api.use("/", userRoutes);
api.use("/news", newsRoutes);

const port = process.env.PORT;
api.listen(port, () => console.log(`API running | http://localhost:${port}`));
