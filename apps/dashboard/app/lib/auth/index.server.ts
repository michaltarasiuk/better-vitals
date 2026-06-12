import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, organization } from "better-auth/plugins";

import { ADMIN_ROLE } from "~/lib/auth/consts";
import { userExists } from "~/lib/db/user";

import { db } from "../db";
import * as schema from "../db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  databaseHooks: {
    user: {
      create: {
        async before(data) {
          if (!(await userExists())) {
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
