"use client";

import type { FieldErrorVariants } from "@lite-app/styles/components/field-error";
import { fieldErrorVariants } from "@lite-app/styles/components/field-error";
import type { ComponentPropsWithRef } from "react";
import { FieldError as FieldErrorPrimitive } from "react-aria-components/FieldError";

import { composeTwRenderProps } from "../../utils/compose";

interface FieldErrorRootProps
  extends
    ComponentPropsWithRef<typeof FieldErrorPrimitive>,
    FieldErrorVariants {}

function FieldErrorRoot({ children, className, ...rest }: FieldErrorRootProps) {
  return (
    <FieldErrorPrimitive
      data-visible
      className={composeTwRenderProps(className, fieldErrorVariants())}
      data-slot="field-error"
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
