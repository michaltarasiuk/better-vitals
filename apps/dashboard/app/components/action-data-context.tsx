import { createContext } from "@lite-app/shared/create-context";
import type { ValidationErrors } from "@react-types/shared";

import { FormAlert } from "~/components/form-alert";

export type FormActionSuccess =
  | { type: "alert"; title: string }
  | { type: "dismiss" };

export type FormActionError =
  | { type: "alert"; title: string }
  | { type: "form"; validationErrors: ValidationErrors };

export type FormActionData =
  | { status: "idle" }
  | { status: "success"; success: FormActionSuccess }
  | { status: "error"; error: FormActionError };

export function getFormValidationErrors(actionData: FormActionData) {
  let validationErrors: ValidationErrors = {};
  if (actionData.status === "error" && actionData.error.type === "form") {
    ({ validationErrors } = actionData.error);
  }
  return validationErrors;
}

const [ActionDataContext, useActionDataContext] =
  createContext<FormActionData>("ActionDataContext");

export { ActionDataContext };

export function ActionFormAlert() {
  const actionData = useActionDataContext();
  if (actionData.status === "success" && actionData.success.type === "alert") {
    return <FormAlert status="success" title={actionData.success.title} />;
  }
  if (actionData.status === "error" && actionData.error.type === "alert") {
    return <FormAlert status="danger" title={actionData.error.title} />;
  }
  return null;
}
