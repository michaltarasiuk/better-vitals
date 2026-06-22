import { assertNever } from "@lite-app/shared/assert-never";
import type { FormProps } from "@lite-app/ui/components/form";
import { z } from "zod";

import type { FormActionError } from "~/components/action-data-context";

type OrganizationAlertError = z.infer<typeof OrganizationAlertErrorSchema>;
type OrganizationFormError = z.infer<typeof OrganizationFormErrorSchema>;

const OrganizationAlertErrorSchema = z.object({
  code: z.enum([
    "YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION",
    "YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS",
    "YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION",
    "INVITATION_LIMIT_REACHED",
    "ORGANIZATION_MEMBERSHIP_LIMIT_REACHED",
  ]),
  message: z.string(),
});

const OrganizationFormErrorSchema = z.object({
  code: z.enum([
    "ORGANIZATION_ALREADY_EXISTS",
    "ORGANIZATION_SLUG_ALREADY_TAKEN",
    "USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION",
    "YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE",
    "ROLE_NOT_FOUND",
  ]),
  message: z.string(),
});

export function mapOrganizationErrorToFormActionError(error: unknown) {
  let actionError: FormActionError = {
    type: "alert",
    title: "Couldn't complete that — try again",
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

function mapOrganizationErrorToFields(error: OrganizationFormError) {
  let field: "name" | "email" | "role";
  switch (error.code) {
    case "ORGANIZATION_ALREADY_EXISTS":
    case "ORGANIZATION_SLUG_ALREADY_TAKEN": {
      field = "name";
      break;
    }
    case "USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION": {
      field = "email";
      break;
    }
    case "YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE":
    case "ROLE_NOT_FOUND": {
      field = "role";
      break;
    }
    default: {
      assertNever(error.code);
    }
  }
  return {
    [field]: error.message,
  } satisfies FormProps["validationErrors"];
}
