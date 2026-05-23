"use client";

import type { ComponentPropsWithRef } from "react";
import { Form as FormPrimitive } from "react-aria-components/Form";

interface FormRootProps extends ComponentPropsWithRef<typeof FormPrimitive> {}

function FormRoot({ ...props }: FormRootProps) {
  return <FormPrimitive {...props} />;
}

export { FormRoot };

export type { FormRootProps };
