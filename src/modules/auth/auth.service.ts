import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/db";

export const registerUser = async (email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);

  try {
    return await prisma.user.create({
      data: { email, password: hashed },
    });
  } catch (err: any) {
    // 🔴 email already exists
    if (err.code === "P2002") {
      throw new Error("Email already registered");
    }

    // 🔴 Neon timeout retry
    if (err.code === "ETIMEDOUT") {
      return prisma.user.create({
        data: { email, password: hashed },
      });
    }

    throw err;
  }
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return token;
};
