import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, organization } from "better-auth/plugins";

import { ADMIN_ROLE } from "~/lib/auth/roles";
import { db } from "~/lib/db/index.server";
import * as schema from "~/lib/db/schema.server";
import { hasUsers } from "~/lib/db/user.server";
import { sendEmail } from "~/lib/email/send.server";
import { env } from "~/lib/env.server";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url, token }) =>
      void (await sendEmail({
        to: user.email,
        subject: "Reset password",
        html: `<a href="${url}">Reset password</a>`,
        idempotencyKey: `password-reset/${token}`,
      })),
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
