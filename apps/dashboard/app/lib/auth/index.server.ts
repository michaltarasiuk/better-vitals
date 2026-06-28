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
    sendResetPassword: async ({ user, url, token }) => {
      const email = await sendEmail({
        to: user.email,
        subject: "Reset password",
        html: `<a href="${url}">Reset your password</a>`,
        idempotencyKey: `password-reset/${token}`,
      });
      if (email instanceof Error) {
        console.error(email);
      }
    },
  },
  plugins: [
    admin(),
    organization({
      sendInvitationEmail: async ({
        id,
        email: to,
        organization: { name, slug },
      }) => {
        const url = new URL(
          `/organization/${slug}/invite/accept`,
          env.BETTER_AUTH_URL
        );
        url.searchParams.set("id", id);

        const email = await sendEmail({
          to,
          subject: `Join ${name}`,
          html: `<a href="${url.href}">Accept invitation</a>`,
          idempotencyKey: `invitation/${id}`,
        });
        if (email instanceof Error) {
          console.error(email);
        }
      },
    }),
  ],
  databaseHooks: {
    user: {
      create: {
        async before(data) {
          const hasAnyUsers = await hasUsers();
          if (hasAnyUsers instanceof Error) {
            throw hasAnyUsers;
          }
          if (!hasAnyUsers) {
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
