import { createContext } from "@lite-app/shared/create-context";

import { Form, type FormValidationErrors } from "~/components/form";
import { FormAlert } from "~/components/form-alert";

export type FormActionError =
  | { type: "alert"; title: string }
  | { type: "form"; validationErrors: FormValidationErrors };

export type FormActionData =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; error: FormActionError };

const INITIAL_ACTION_DATA: FormActionData = { status: "idle" };

const [ActionDataContext, useActionDataContext] =
  createContext<FormActionData>("ActionDataContext");

interface ActionFormProps extends React.ComponentProps<typeof Form> {
  actionData?: FormActionData;
}

export function ActionForm({
  children,
  actionData = INITIAL_ACTION_DATA,
  ...rest
}: ActionFormProps) {
  const validationErrors: FormValidationErrors =
    actionData.status === "error" && actionData.error.type === "form"
      ? actionData.error.validationErrors
      : {};
  return (
    <ActionDataContext value={actionData}>
      <Form validationErrors={validationErrors} {...rest}>
        {children}
      </Form>
    </ActionDataContext>
  );
}

export function ActionFormAlert() {
  const actionData = useActionDataContext();
  if (actionData.status === "error" && actionData.error.type === "alert") {
    return <FormAlert title={actionData.error.title} />;
  }
  return null;
}
