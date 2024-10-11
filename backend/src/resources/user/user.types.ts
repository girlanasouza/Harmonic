import { User } from "@prisma/client";

export type CreateUserDTO = Pick<
  User,
  "name" | "email" | "birth" | "url_img_profile" | "password"
>;
export type UpdateUserDTO = Pick<User, "name" | "birth" | "url_img_profile">;
export type UserDto = Omit<User, "password">;
