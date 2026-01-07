import { Router } from "express";
import { createUrl, listUrls, removeUrl, singleUrl } from "./url.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createUrl);
router.get("/", authMiddleware, listUrls);
router.get("/:shortCode", authMiddleware, singleUrl);
router.delete("/:id", authMiddleware, removeUrl);

export default router;
