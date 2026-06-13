"use client";

import {
  Form as RACForm,
  type FormProps as RACFormProps,
} from "react-aria-components/Form";

export interface FormProps extends RACFormProps {}

export function Form({ children, onSubmit, ...rest }: FormProps) {
  return (
    <RACForm onSubmit={onSubmit} {...rest}>
      {children}
    </RACForm>
  );
}
