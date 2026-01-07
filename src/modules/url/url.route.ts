import { Router } from "express";
import { createUrl, listUrls, removeUrl } from "./url.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createUrl);
router.get("/", authMiddleware, listUrls);
router.delete("/:id", authMiddleware, removeUrl);

export default router;
