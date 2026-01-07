import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.route";
import urlRoutes from "./modules/url/url.route";
import { errorMiddleware } from "./middlewares/error.middleware";
import { prisma } from "./config/db";

const app = express();

/* -------------------- MIDDLEWARES -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- ROUTES -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/urls", urlRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hi" });
});
/* -------------------- PUBLIC REDIRECT -------------------- */
app.get("/:code", async (req, res) => {
  const { code } = req.params;

  const url = await prisma.url.findUnique({
    where: { shortCode: code },
  });

  if (!url) {
    return res.status(404).json({ message: "Short URL not found" });
  }

  await prisma.url.update({
    where: { id: url.id },
    data: { clicks: { increment: 1 } },
  });

  return res.redirect(url.originalUrl);
});

/* -------------------- ERROR HANDLER -------------------- */
app.use(errorMiddleware);

export default app;
