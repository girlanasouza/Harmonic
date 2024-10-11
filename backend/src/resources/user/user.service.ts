import { Prisma, PrismaClient } from "@prisma/client";
import { genSalt, hash } from "bcryptjs";
import { CreateUserDTO, UpdateUserDTO, UserDto } from "./user.types";
import {
  PrismaClientKnownRequestError,
  PrismaErrorCode,
} from "../../types/prismaErrors";

const prisma = new PrismaClient();

const readUser = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      birth: true,
      url_img_profile: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const updateUser = async (id: string, user: UpdateUserDTO) => {
  return await prisma.user.update({ where: { id }, data: user });
};

const removeUser = async (id: string) => {
  return await prisma.user.delete({ where: { id } });
};

const createUser = async (user: CreateUserDTO): Promise<UserDto> => {
  const rounds = parseInt(process.env.BCRYPT_ROUDS!);
  const salt = await genSalt(rounds);
  const password = await hash(user.password, salt);

  try {
    const userCreated = await prisma.user.create({
      select: {
        id: true,
        name: true,
        password: false,
        email: true,
        birth: true,
        url_img_profile: true,
        createdAt: true,
        updatedAt: true,
      },
      data: {
        ...user,
        birth: new Date(user.birth),
        password,
      },
    });

    return userCreated;
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      (e as PrismaClientKnownRequestError).code ===
        PrismaErrorCode.UniqueConstraintViolation
    ) {
      throw new Error("P2002");
    }
    throw e;
  }
};

export default { readUser, updateUser, removeUser, createUser };
