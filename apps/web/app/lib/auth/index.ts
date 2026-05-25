import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";

import { db } from "../db";
import { user as userTable } from "../db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  databaseHooks: {
    user: {
      create: {
        async before(data) {
          const userCount = await db.$count(userTable);
          const userAlreadyExists = userCount > 0;
          if (!userAlreadyExists) {
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
