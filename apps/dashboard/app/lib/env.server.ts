import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.url(),
    RESEND_API_KEY: z.string(),
    EMAIL_FROM: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
