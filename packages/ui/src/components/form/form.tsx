"use client";

import type { ComponentPropsWithRef } from "react";
import { Form as FormPrimitive } from "react-aria-components/Form";

interface FormRootProps extends ComponentPropsWithRef<typeof FormPrimitive> {}

function FormRoot({ children, onSubmit, ...rest }: FormRootProps) {
  return (
    <FormPrimitive onSubmit={onSubmit} {...rest}>
      {children}
    </FormPrimitive>
  );
}

export { FormRoot };

export type { FormRootProps };
