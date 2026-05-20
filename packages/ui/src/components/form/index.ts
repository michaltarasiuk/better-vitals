import type { ComponentProps } from "react";

import { FormRoot } from "./form";

/*
 * Compound Component
 */
export const Form = Object.assign(FormRoot, {
  Root: FormRoot,
});

export interface Form {
  Props: ComponentProps<typeof FormRoot>;
  RootProps: ComponentProps<typeof FormRoot>;
}

/*
 * Named Component
 */
export { FormRoot };

export type { FormRootProps as FormProps, FormRootProps } from "./form";
