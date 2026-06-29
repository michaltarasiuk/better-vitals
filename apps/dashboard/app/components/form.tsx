import type { ValidationErrors } from "@react-types/shared";
import * as Aria from "react-aria-components/Form";
import { useSubmit, type SubmitOptions } from "react-router";

import { useFormContext } from "~/components/form-context";

export interface FormProps
  extends Pick<Aria.FormProps, "children" | "onSubmit">, SubmitOptions {}

export function Form({ children, onSubmit, ...rest }: FormProps) {
  const context = useFormContext();
  const submit = useSubmit();

  let validationErrors: ValidationErrors = {};
  if (context.status === "error" && context.error.type === "form") {
    ({ validationErrors } = context.error);
  }

  return (
    <Aria.Form
      validationErrors={validationErrors}
      onSubmit={(event) => {
        onSubmit?.(event);
        if (!event.defaultPrevented) {
          event.preventDefault();
          submit(event.currentTarget, rest);
        }
      }}
    >
      {children}
    </Aria.Form>
  );
}
