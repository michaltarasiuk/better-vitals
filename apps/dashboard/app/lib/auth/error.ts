import { assertNever } from "@lite-app/shared/assert-never";
import * as errore from "errore";
import { z } from "zod";

export class PasswordMismatchError extends errore.createTaggedError({
  name: "PasswordMismatchError",
  message: "Password mismatch",
}) {}

export function comparePasswords({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) {
  if (password !== confirmPassword) {
    return new PasswordMismatchError();
  }
  return null;
}

type AuthAlertErrorPayload = z.infer<typeof AuthAlertErrorSchema>;
type AuthFormErrorPayload = z.infer<typeof AuthFormErrorSchema>;

const AuthAlertErrorSchema = z.object({
  code: z.enum([
    "EMAIL_PASSWORD_DISABLED",
    "EMAIL_PASSWORD_SIGN_UP_DISABLED",
    "EMAIL_ALREADY_VERIFIED",
    "EMAIL_MISMATCH",
    "EMAIL_NOT_VERIFIED",
    "INVALID_EMAIL_OR_PASSWORD",
    "INVALID_TOKEN",
    "RESET_PASSWORD_DISABLED",
    "TOKEN_EXPIRED",
    "VERIFICATION_EMAIL_NOT_ENABLED",
  ]),
  message: z.string(),
});

const AuthFormErrorSchema = z.object({
  code: z.enum([
    "USER_ALREADY_EXISTS",
    "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL",
    "INVALID_EMAIL",
    "INVALID_PASSWORD",
    "PASSWORD_TOO_SHORT",
    "PASSWORD_TOO_LONG",
  ]),
  message: z.string(),
});

export function isAuthAlertError(
  value: unknown
): value is AuthAlertErrorPayload {
  return AuthAlertErrorSchema.safeParse(value).success;
}

export function isAuthFormError(value: unknown): value is AuthFormErrorPayload {
  return AuthFormErrorSchema.safeParse(value).success;
}

export function mapAuthFormErrorCodeToField(
  code: AuthFormErrorPayload["code"]
) {
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
