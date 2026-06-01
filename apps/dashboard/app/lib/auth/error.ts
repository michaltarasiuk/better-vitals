import { assertNever } from "@lite-app/shared/assert-never";
import { z } from "zod";

export type AuthError = z.infer<typeof AuthErrorSchema>;
export type AuthErrorCode = z.infer<typeof AuthErrorCodeSchema>;

const AUTH_ERROR_CODES = [
  "USER_ALREADY_EXISTS",
  "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL",
  "INVALID_EMAIL",
  "INVALID_PASSWORD",
  "PASSWORD_TOO_SHORT",
  "PASSWORD_TOO_LONG",
] as const;

export const AuthErrorCodeSchema = z.enum(AUTH_ERROR_CODES);
export const AuthErrorSchema = z.object({
  code: AuthErrorCodeSchema,
  message: z.string(),
});

export function isKnownAuthError(error: unknown): error is AuthError {
  return AuthErrorSchema.safeParse(error).success;
}

export function getAuthErrorField(code: AuthErrorCode) {
  let field: "email" | "password";
  switch (code) {
    case "USER_ALREADY_EXISTS":
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
    case "INVALID_EMAIL": {
      field = "email";
      break;
    }
    case "INVALID_PASSWORD":
    case "PASSWORD_TOO_SHORT":
    case "PASSWORD_TOO_LONG": {
      field = "password";
      break;
    }
    default: {
      assertNever(code);
    }
  }
  return field;
}
