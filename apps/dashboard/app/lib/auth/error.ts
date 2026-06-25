import { assertNever } from "@lite-app/shared/assert-never";
import type { ValidationErrors } from "@react-types/shared";
import * as errore from "errore";
import { z } from "zod";

import type { FormActionError } from "~/components/action-data-context";

export class AuthError extends errore.createTaggedError({
  name: "AuthError",
  message: "$operation failed",
}) {}

export class SessionError extends errore.createTaggedError({
  name: "SessionError",
  message: "Session $operation failed",
}) {}

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

type AuthAlertError = z.infer<typeof AuthAlertErrorSchema>;
type AuthFormError = z.infer<typeof AuthFormErrorSchema>;

const AuthAlertErrorSchema = z.object({
  code: z.enum([
    "EMAIL_ALREADY_VERIFIED",
    "EMAIL_MISMATCH",
    "EMAIL_NOT_VERIFIED",
    "EMAIL_PASSWORD_DISABLED",
    "EMAIL_PASSWORD_SIGN_UP_DISABLED",
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
    "INVALID_EMAIL",
    "INVALID_PASSWORD",
    "PASSWORD_TOO_LONG",
    "PASSWORD_TOO_SHORT",
    "USER_ALREADY_EXISTS",
    "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL",
  ]),
  message: z.string(),
});

export function mapAuthErrorToFormActionError(error: unknown) {
  let actionError: FormActionError = {
    type: "alert",
    title: "Unknown error",
  };
  if (isAuthAlertError(error)) {
    actionError = {
      type: "alert",
      title: error.message,
    };
  } else if (isAuthFormError(error)) {
    actionError = {
      type: "form",
      validationErrors: mapAuthErrorToFields(error),
    };
  } else {
    console.error(error);
  }
  return actionError;
}

function isAuthAlertError(value: unknown): value is AuthAlertError {
  return AuthAlertErrorSchema.safeParse(value).success;
}

function isAuthFormError(value: unknown): value is AuthFormError {
  return AuthFormErrorSchema.safeParse(value).success;
}

function mapAuthErrorToFields(error: AuthFormError): ValidationErrors {
  let field: "email" | "password";
  switch (error.code) {
    case "USER_ALREADY_EXISTS":
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
    case "INVALID_EMAIL": {
      field = "email";
      break;
    }
    case "INVALID_PASSWORD":
    case "PASSWORD_TOO_LONG":
    case "PASSWORD_TOO_SHORT": {
      field = "password";
      break;
    }
    default: {
      assertNever(error.code);
    }
  }
  return {
    [field]: error.message,
  };
}
