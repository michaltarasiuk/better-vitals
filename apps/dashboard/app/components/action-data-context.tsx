import { createContext } from "@lite-app/shared/create-context";
import type { FormProps } from "@lite-app/ui/components/form";

import { FormAlert } from "~/components/form-alert";

export type FormActionError =
  | { type: "alert"; title: string }
  | { type: "form"; validationErrors: FormProps["validationErrors"] };

export type FormActionData =
  | { status: "idle" }
  | { status: "success"; title: string }
  | { status: "error"; error: FormActionError };

export function getFormValidationErrors(
  actionData: FormActionData
): FormProps["validationErrors"] {
  let validationErrors: FormProps["validationErrors"] = {};
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
  if (actionData.status === "success") {
    return <FormAlert status="success" title={actionData.title} />;
  }
  if (actionData.status === "error" && actionData.error.type === "alert") {
    return <FormAlert status="danger" title={actionData.error.title} />;
  }
  return null;
}
