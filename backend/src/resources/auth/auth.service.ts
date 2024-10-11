import { UserDto } from "../user/user.types";
import { PrismaClient } from "@prisma/client";
import { LoginDto } from "./auth.types";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export const checkCredentials = async (
  creadetions: LoginDto
): Promise<UserDto | null> => {
  const user = await prisma.user.findUnique({
    where: { email: creadetions.email },
  });

  if (!user) return null;
  const ok = await compare(creadetions.password, user.password);
  if (!ok) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    birth: user.birth,
    url_img_profile: user.url_img_profile,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  } as UserDto;
};

export const selectUser = async (id: string): Promise<UserDto | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    birth: user.birth,
    url_img_profile: user.url_img_profile,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  } as UserDto;
};
