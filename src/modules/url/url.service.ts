import { prisma } from "../../config/db";
import { generateShortCode } from "../../utils/generateShortCode";

export const createShortUrl = async (userId: number, originalUrl: string) => {
  const count = await prisma.url.count({ where: { userId } });
  if (count >= 100) throw new Error("Free limit reached");

  let shortCode = generateShortCode();
  while (await prisma.url.findUnique({ where: { shortCode } })) {
    shortCode = generateShortCode();
  }

  return prisma.url.create({
    data: { originalUrl, shortCode, userId },
  });
};

export const getUserUrls = (userId: number) =>
  prisma.url.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });

export const deleteUrl = (id: number, userId: number) =>
  prisma.url.deleteMany({ where: { id, userId } });
