import type { ComponentProps } from "react";

import { FieldErrorRoot } from "./field-error";

export const FieldError = Object.assign(FieldErrorRoot, {
  Root: FieldErrorRoot,
});

export interface FieldError {
  Props: ComponentProps<typeof FieldErrorRoot>;
  RootProps: ComponentProps<typeof FieldErrorRoot>;
}

export { FieldErrorRoot };

export type {
  FieldErrorRootProps as FieldErrorProps,
  FieldErrorRootProps,
} from "./field-error";

export { fieldErrorVariants } from "@lite-app/styles/components/field-error";

export type { FieldErrorVariants } from "@lite-app/styles/components/field-error";
