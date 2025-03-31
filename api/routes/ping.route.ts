import { Router } from "express";
import { getAccessToken } from "../utils/token.js";

const router = Router();
router.get("*", async (_, res) => {
  try {
    await getAccessToken();

    res.send({ message: "Ping action successful" });
  } catch (error) {
    res.send({ message: error });
  }
});

export default router;
