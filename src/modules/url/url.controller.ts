import { Request, Response } from "express";
import {
  createShortUrl,
  getUserUrls,
  deleteUrl,
  getSingleUrl,
} from "./url.service";

export const createUrl = async (req: any, res: Response) => {
  const url = await createShortUrl(req.userId, req.body.originalUrl);
  res.status(201).json(url);
};

export const listUrls = async (req: any, res: Response) => {
  const urls = await getUserUrls(req.userId);
  res.json(urls);
};
export const singleUrl = async (req: any, res: Response) => {
  const urls = await getSingleUrl(req.params.shortCode);
  res.json(urls);
};

export const removeUrl = async (req: any, res: Response) => {
  await deleteUrl(Number(req.params.id), req.userId);
  res.json({ message: "Deleted" });
};
