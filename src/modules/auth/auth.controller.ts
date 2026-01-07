import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";

export const register = async (req: Request, res: Response) => {
  const user = await registerUser(req.body.email, req.body.password);
  res.status(201).json({ message: "User registered", user });
};

export const login = async (req: Request, res: Response) => {
  const token = await loginUser(req.body.email, req.body.password);
  res.json({ token });
};
