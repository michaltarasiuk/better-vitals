import { createAuthClient } from "better-auth/client";
import { adminClient, organizationClient } from "better-auth/client/plugins";

const authClient = createAuthClient({
  plugins: [adminClient(), organizationClient()],
});
export const {
  signUp,
  signIn,
  requestPasswordReset,
  resetPassword,
  getSession,
  organization,
} = authClient;
