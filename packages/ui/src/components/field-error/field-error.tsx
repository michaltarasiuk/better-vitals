"use client";

import type { ComponentPropsWithRef } from "react";
import { FieldError as FieldErrorPrimitive } from "react-aria-components/FieldError";

import { cnRenderProps } from "../../utils/cn-render-props";
import type { FieldErrorVariants } from "./field-error.variants";
import { fieldErrorVariants } from "./field-error.variants";

interface FieldErrorRootProps
  extends
    ComponentPropsWithRef<typeof FieldErrorPrimitive>,
    FieldErrorVariants {}

function FieldErrorRoot({ className, children, ...rest }: FieldErrorRootProps) {
  return (
    <FieldErrorPrimitive
      data-slot="field-error"
      data-visible
      className={cnRenderProps(className, fieldErrorVariants())}
      {...rest}
    >
      {(renderProps) =>
        typeof children === "function" ? children(renderProps) : children
      }
    </FieldErrorPrimitive>
  );
}

export { FieldErrorRoot };

export type { FieldErrorRootProps };
