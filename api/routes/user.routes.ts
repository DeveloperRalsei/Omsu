import { Router } from "express";
import { fetchUsers, getUserById } from "../controllers/user.controller";
const router = Router();

router.get("/user/:id", getUserById);
router.get("/search-user", fetchUsers);
export default router;
