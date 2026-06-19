import { assertNever } from "@lite-app/shared/assert-never";
import { z } from "zod";

import type { FormActionError } from "~/components/action-form";
import type { FormValidationErrors } from "~/components/form";

type OrganizationError = z.infer<typeof OrganizationErrorSchema>;

const OrganizationErrorSchema = z.object({
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
  if (isOrganizationError(error)) {
    actionError = {
      type: "form",
      validationErrors: mapOrganizationErrorToFields(error),
    };
  }
  return actionError;
}

function isOrganizationError(value: unknown): value is OrganizationError {
  return OrganizationErrorSchema.safeParse(value).success;
}

function mapOrganizationErrorToFields(error: OrganizationError) {
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
