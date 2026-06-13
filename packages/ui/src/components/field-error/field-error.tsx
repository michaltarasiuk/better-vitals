"use client";

import {
  FieldError as RACFieldError,
  type FieldErrorProps as RACFieldErrorProps,
} from "react-aria-components/FieldError";

import { cnRenderProps } from "../../utils/cn-render-props";
import { fieldErrorVariants, type FieldErrorVariants } from "./field-error.ts";

export interface FieldErrorProps
  extends RACFieldErrorProps, FieldErrorVariants {}

export function FieldError({ className, children, ...rest }: FieldErrorProps) {
  return (
    <RACFieldError
      data-slot="field-error"
      data-visible
      className={cnRenderProps(className, fieldErrorVariants())}
      {...rest}
    >
      {children}
    </RACFieldError>
  );
}
