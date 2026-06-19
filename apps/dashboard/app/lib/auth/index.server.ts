import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, organization } from "better-auth/plugins";

import { db } from "~/lib/db/index.server";
import * as schema from "~/lib/db/schema.server";
import { hasUsers } from "~/lib/db/user.server";
import { ADMIN_ROLE } from "~/lib/organization/roles";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [admin(), organization()],
  databaseHooks: {
    user: {
      create: {
        async before(data) {
          if (!(await hasUsers())) {
            data.role = ADMIN_ROLE;
          }
          return {
            data,
          };
        },
      },
    },
  },
});
