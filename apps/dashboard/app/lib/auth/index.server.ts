import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, organization } from "better-auth/plugins";
import { href } from "react-router";

import { ADMIN_ROLE } from "~/lib/auth/consts";

import { db } from "../db";
import * as schema from "../db/schema";

export async function hasExistingUser() {
  const userCount = await db.$count(schema.user);
  return userCount > 0;
}

export async function getUnauthenticatedRedirectHref() {
  return (await hasExistingUser()) ? href("/signin") : href("/signup");
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
            data.role = ADMIN_ROLE;
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
  plugins: [admin(), organization()],
});
