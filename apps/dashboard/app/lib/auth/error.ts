import { assertNever } from "@lite-app/shared/assert-never";
import { z } from "zod";

export type AuthError = z.infer<typeof authErrorSchema>;
export type AuthErrorCode = z.infer<typeof authErrorCodeSchema>;

export const AUTH_ERROR_CODES = [
  "USER_ALREADY_EXISTS",
  "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL",
  "INVALID_EMAIL",
  "EMAIL_NOT_VERIFIED",
  "EMAIL_CAN_NOT_BE_UPDATED",
  "CHANGE_EMAIL_DISABLED",
  "EMAIL_ALREADY_VERIFIED",
  "EMAIL_MISMATCH",
  "VERIFICATION_EMAIL_NOT_ENABLED",
  "INVALID_EMAIL_OR_PASSWORD",
  "RESET_PASSWORD_DISABLED",
  "INVALID_PASSWORD",
  "PASSWORD_TOO_SHORT",
  "PASSWORD_TOO_LONG",
  "INVALID_TOKEN",
  "TOKEN_EXPIRED",
  "FAILED_TO_CREATE_VERIFICATION",
] as const;

export const authErrorCodeSchema = z.enum(AUTH_ERROR_CODES);
export const authErrorSchema = z.object({
  code: authErrorCodeSchema,
  message: z.string(),
});

export function isAuthError(error: unknown): error is AuthError {
  return authErrorSchema.safeParse(error).success;
}

export function getAuthErrorField(code: AuthErrorCode) {
  switch (code) {
    case "USER_ALREADY_EXISTS":
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
    case "INVALID_EMAIL":
    case "EMAIL_NOT_VERIFIED":
    case "EMAIL_CAN_NOT_BE_UPDATED":
    case "CHANGE_EMAIL_DISABLED":
    case "EMAIL_ALREADY_VERIFIED":
    case "EMAIL_MISMATCH":
    case "VERIFICATION_EMAIL_NOT_ENABLED":
    case "INVALID_EMAIL_OR_PASSWORD":
    case "RESET_PASSWORD_DISABLED": {
      return "email";
    }
    case "INVALID_PASSWORD":
    case "PASSWORD_TOO_SHORT":
    case "PASSWORD_TOO_LONG":
    case "INVALID_TOKEN":
    case "TOKEN_EXPIRED":
    case "FAILED_TO_CREATE_VERIFICATION": {
      return "password";
    }
    default: {
      assertNever(code);
    }
  }
}
