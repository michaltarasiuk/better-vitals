"use client";

import {
  Form as RACForm,
  type FormProps as RACFormProps,
} from "react-aria-components/Form";

interface FormProps extends RACFormProps {}

function Form({ children, onSubmit, ...rest }: FormProps) {
  return (
    <RACForm onSubmit={onSubmit} {...rest}>
      {children}
    </RACForm>
  );
}

export { Form };
export type { FormProps };
