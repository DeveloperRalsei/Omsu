import { Router } from "express";
import { getNews, getNewsletter } from "../controllers/news.controller";

const router = Router();

router.get("/", getNews);
router.get("/:name", getNewsletter);

export default router;
