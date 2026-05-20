"use client";

import type { ComponentPropsWithRef } from "react";
import { Form as FormPrimitive } from "react-aria-components/Form";

/*
 * Form Root
 */
interface FormRootProps extends ComponentPropsWithRef<typeof FormPrimitive> {}

const FormRoot = ({ ...props }: FormRootProps) => <FormPrimitive {...props} />;

/*
 * Exports
 */
export { FormRoot };

export type { FormRootProps };
