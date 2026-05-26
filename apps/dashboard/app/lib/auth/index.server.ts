import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";

import { db } from "../db";
import * as schema from "../db/schema";

export async function hasExistingUser() {
  const userCount = await db.$count(schema.user);
  return userCount > 0;
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  databaseHooks: {
    user: {
      create: {
        async before(data) {
          if (!(await hasExistingUser())) {
            data.role = "admin";
          }
          return {
            data,
          };
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [admin()],
});
