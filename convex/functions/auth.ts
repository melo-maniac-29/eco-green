import { mutation } from "@convex-dev/server";
import bcrypt from "bcrypt"; // Password hashing library

export const signUp = mutation(async ({ username, password }, ctx) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await ctx.db.user.create({
    data: { username, password: hashedPassword },
  });

  return user;
});

export const login = mutation(async ({ username, password }, ctx) => {
  const user = await ctx.db.user.findFirst({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  return user;
});
