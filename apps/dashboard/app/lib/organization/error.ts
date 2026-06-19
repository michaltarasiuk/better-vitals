import { assertNever } from "@lite-app/shared/assert-never";
import { z } from "zod";

import type { FormActionError } from "~/components/action-form";
import type { FormValidationErrors } from "~/components/form";

type OrganizationAlertError = z.infer<typeof OrganizationAlertErrorSchema>;
type OrganizationFormError = z.infer<typeof OrganizationFormErrorSchema>;

const OrganizationAlertErrorSchema = z.object({
  code: z.enum([
    "YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION",
    "YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS",
  ]),
  message: z.string(),
});

const OrganizationFormErrorSchema = z.object({
  code: z.enum([
    "ORGANIZATION_ALREADY_EXISTS",
    "ORGANIZATION_SLUG_ALREADY_TAKEN",
  ]),
  message: z.string(),
});

export function mapOrganizationErrorToFormActionError(error: unknown) {
  let actionError: FormActionError = {
    type: "alert",
    title: "An unexpected error occurred",
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
  let field: "name";
  switch (error.code) {
    case "ORGANIZATION_ALREADY_EXISTS":
    case "ORGANIZATION_SLUG_ALREADY_TAKEN": {
      field = "name";
      break;
    }
    default: {
      assertNever(error.code);
    }
  }
  return {
    [field]: error.message,
  } satisfies FormValidationErrors;
}
