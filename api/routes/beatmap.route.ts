import { Router } from "express";
import { fetchBeatmaps, getById } from "../controllers/beatmap.controller";

const router = Router();

router.get("/beatmapsets", fetchBeatmaps);
router.get("/beatmapset/:id", getById);

export default router;
