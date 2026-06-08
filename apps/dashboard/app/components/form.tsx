"use client";

import {
  Form as UIForm,
  type FormProps as UIFormProps,
} from "@lite-app/ui/components/form";
import { useSubmit } from "react-router";

export interface FormProps extends UIFormProps {}

export function Form({
  method = "post",
  children,
  onSubmit,
  ...rest
}: FormProps) {
  const submit = useSubmit();
  return (
    <UIForm
      method={method}
      onSubmit={(e) => {
        onSubmit?.(e);

        // If the consumer called e.preventDefault() in their custom onSubmit,
        // we should bail out and let them handle the submission entirely.
        if (!e.isDefaultPrevented()) {
          e.preventDefault();
          if (method === "get" || method === "post") {
            submit(e.currentTarget, {
              method,
            });
          }
        }
      }}
      {...rest}
    >
      {children}
    </UIForm>
  );
}
