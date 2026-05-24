"use client";

import type { FieldErrorProps as RACFieldErrorProps } from "react-aria-components/FieldError";
import { FieldError as RACFieldError } from "react-aria-components/FieldError";

import { cnRenderProps } from "../../utils/cn-render-props";
import type { FieldErrorVariants } from "./field-error.variants";
import { fieldErrorVariants } from "./field-error.variants";

interface FieldErrorProps extends RACFieldErrorProps, FieldErrorVariants {}

function FieldError({ className, children, ...rest }: FieldErrorProps) {
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

export { FieldError };
export type { FieldErrorProps };
