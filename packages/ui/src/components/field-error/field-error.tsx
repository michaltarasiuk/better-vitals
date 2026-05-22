"use client";

import type { FieldErrorVariants } from "@lite-app/styles/components/field-error";
import { fieldErrorVariants } from "@lite-app/styles/components/field-error";
import type { ComponentPropsWithRef } from "react";
import { FieldError as FieldErrorPrimitive } from "react-aria-components/FieldError";

import { composeTwRenderProps } from "../../utils/compose";

/*
 * Field Error Root
 */
interface FieldErrorRootProps
  extends
    ComponentPropsWithRef<typeof FieldErrorPrimitive>,
    FieldErrorVariants {}

const FieldErrorRoot = ({
  children,
  className,
  ...rest
}: FieldErrorRootProps) => (
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

/*
 * Exports
 */
export { FieldErrorRoot };

export type { FieldErrorRootProps };
