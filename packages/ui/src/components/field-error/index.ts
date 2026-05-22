import type { ComponentProps } from "react";

import { FieldErrorRoot } from "./field-error";

/*
 * Compound Component
 */
export const FieldError = Object.assign(FieldErrorRoot, {
  Root: FieldErrorRoot,
});

export interface FieldError {
  Props: ComponentProps<typeof FieldErrorRoot>;
  RootProps: ComponentProps<typeof FieldErrorRoot>;
}

/*
 * Named Component
 */
export { FieldErrorRoot };

export type {
  FieldErrorRootProps as FieldErrorProps,
  FieldErrorRootProps,
} from "./field-error";

/*
 * Variants
 */
export { fieldErrorVariants } from "@lite-app/styles/components/field-error";

export type { FieldErrorVariants } from "@lite-app/styles/components/field-error";
