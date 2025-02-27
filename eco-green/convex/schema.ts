// convex/schema.ts

import { defineTable, defineSchema } from "@convex-dev/server";

export const schema = defineSchema({
  // Define your tables here
  users: defineTable({
    username: "string",
    password: "string",  // Hashed password
  }),
});