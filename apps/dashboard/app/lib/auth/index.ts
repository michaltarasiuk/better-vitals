import { createAuthClient } from "better-auth/client";
import { adminClient, organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [adminClient(), organizationClient()],
});
export const {
  signIn,
  signUp,
  getSession,
  organization,
  resetPassword,
  requestPasswordReset,
} = authClient;
