import * as bCrypt from "bcryptjs";

export const hashPassword = async function (password: string) {
  const salt = await bCrypt.genSalt();
  const hashedPassword = await bCrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async function (
  password: string,
  hashedPassword: string,
) {
  return await bCrypt.compare(password, hashedPassword);
};