import { prisma } from "../../config/db";
import { generateShortCode } from "../../utils/generateShortCode";

export const createShortUrl = async (userId: any, longUrl: string) => {
  const count = await prisma.url.count({ where: { userId } });
  if (count >= 100) throw new Error("Free limit reached");

  let shortCode = generateShortCode();
  while (await prisma.url.findUnique({ where: { shortCode } })) {
    shortCode = generateShortCode();
  }

  return prisma.url.create({
    data: { longUrl, shortCode, userId },
  });
};

export const getUserUrls = (userId: any) =>
  prisma.url.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });

export const deleteUrl = (id: any, userId: any) =>
  prisma.url.deleteMany({ where: { id, userId } });
