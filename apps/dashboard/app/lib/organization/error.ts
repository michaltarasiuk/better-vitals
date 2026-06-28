import { assertNever } from "@better-vitals/shared/assert-never";
import type { ValidationErrors } from "@react-types/shared";
import * as errore from "errore";
import { z } from "zod";

import type { FormActionError } from "~/components/action-data-context";

export class OrganizationError extends errore.createTaggedError({
  name: "OrganizationError",
  message: "$operation failed",
}) {}

type OrganizationAlertError = z.infer<typeof OrganizationAlertErrorSchema>;
type OrganizationFormError = z.infer<typeof OrganizationFormErrorSchema>;

const OrganizationAlertErrorSchema = z.object({
  code: z.enum([
    "EMAIL_VERIFICATION_REQUIRED_BEFORE_ACCEPTING_OR_REJECTING_INVITATION",
    "EMAIL_VERIFICATION_REQUIRED_FOR_INVITATION",
    "FAILED_TO_RETRIEVE_INVITATION",
    "INVITATION_LIMIT_REACHED",
    "INVITATION_NOT_FOUND",
    "INVITER_IS_NO_LONGER_A_MEMBER_OF_THE_ORGANIZATION",
    "ORGANIZATION_MEMBERSHIP_LIMIT_REACHED",
    "ORGANIZATION_NOT_FOUND",
    "YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION",
    "YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION",
    "YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION",
    "YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS",
  ]),
  message: z.string(),
});

const OrganizationFormErrorSchema = z.object({
  code: z.enum([
    "ORGANIZATION_ALREADY_EXISTS",
    "ORGANIZATION_SLUG_ALREADY_TAKEN",
    "ROLE_NOT_FOUND",
    "USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION",
    "USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION",
    "YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE",
  ]),
  message: z.string(),
});

export function mapOrganizationErrorToFormActionError(error: unknown) {
  let actionError: FormActionError = {
    type: "alert",
    title: "Unknown error",
  };
  if (isOrganizationAlertError(error)) {
    actionError = {
      type: "alert",
      title: error.message,
    };
  } else if (isOrganizationFormError(error)) {
    actionError = {
      type: "form",
      validationErrors: mapOrganizationErrorToFields(error),
    };
  } else {
    console.error(error);
  }
  return actionError;
}

function isOrganizationAlertError(
  value: unknown
): value is OrganizationAlertError {
  return OrganizationAlertErrorSchema.safeParse(value).success;
}

function isOrganizationFormError(
  value: unknown
): value is OrganizationFormError {
  return OrganizationFormErrorSchema.safeParse(value).success;
}

function mapOrganizationErrorToFields(
  error: OrganizationFormError
): ValidationErrors {
  let field: "slug" | "email" | "role";
  switch (error.code) {
    case "ORGANIZATION_ALREADY_EXISTS":
    case "ORGANIZATION_SLUG_ALREADY_TAKEN": {
      field = "slug";
      break;
    }
    case "USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION":
    case "USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION": {
      field = "email";
      break;
    }
    case "ROLE_NOT_FOUND":
    case "YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE": {
      field = "role";
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
