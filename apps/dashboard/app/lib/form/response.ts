import type { ValidationErrors } from "@react-types/shared";
import { data } from "react-router";

import type { FormActionData } from "~/components/action-data-context";

import type { InvalidFormDataError } from "./form-data";

export function invalidFormDataResponse(error: InvalidFormDataError) {
  return data<FormActionData>(
    {
      status: "error",
      error: {
        type: "alert",
        title: error.message,
      },
    },
    {
      status: 400,
    }
  );
}

export function formValidationErrorResponse(
  validationErrors: ValidationErrors
) {
  return data<FormActionData>(
    {
      status: "error",
      error: {
        type: "form",
        validationErrors,
      },
    },
    {
      status: 400,
    }
  );
}
