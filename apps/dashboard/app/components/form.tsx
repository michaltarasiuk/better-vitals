import {
  Form as UIForm,
  type FormProps as UIFormProps,
} from "@better-vitals/ui/components/form";
import { useSubmit, type SubmitOptions } from "react-router";

import {
  ActionDataContext,
  getFormValidationErrors,
  type FormActionData,
} from "~/components/action-data-context";

const INITIAL_ACTION_DATA: FormActionData = { status: "idle" };

export interface FormProps
  extends Pick<UIFormProps, "children" | "onSubmit">, SubmitOptions {
  actionData?: FormActionData;
}

export function Form({
  children,
  actionData = INITIAL_ACTION_DATA,
  onSubmit,
  ...rest
}: FormProps) {
  const submit = useSubmit();

  return (
    <ActionDataContext value={actionData}>
      <UIForm
        validationErrors={getFormValidationErrors(actionData)}
        onSubmit={(e) => {
          onSubmit?.(e);
          if (!e.defaultPrevented) {
            e.preventDefault();
            submit(e.currentTarget, rest);
          }
        }}
      >
        {children}
      </UIForm>
    </ActionDataContext>
  );
}
