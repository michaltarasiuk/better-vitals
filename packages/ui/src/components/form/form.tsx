"use client";

import type { ComponentPropsWithRef } from "react";
import { Form as FormPrimitive } from "react-aria-components/Form";

/*
 * Form Root
 */
interface FormRootProps extends ComponentPropsWithRef<typeof FormPrimitive> {}

function FormRoot({ ...props }: FormRootProps) {
  return <FormPrimitive {...props} />;
}

/*
 * Exports
 */
export { FormRoot };

export type { FormRootProps };
