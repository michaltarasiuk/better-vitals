import type { ComponentProps } from "react";

import { TextFieldRoot } from "./textfield";

/*
 * Compound Component
 */
export const TextField = Object.assign(TextFieldRoot, {
  Root: TextFieldRoot,
});

export interface TextField {
  Props: ComponentProps<typeof TextFieldRoot>;
  RootProps: ComponentProps<typeof TextFieldRoot>;
}

/*
 * Named Component
 */
export { TextFieldRoot };

export type {
  TextFieldRootProps as TextFieldProps,
  TextFieldRootProps,
} from "./textfield";

/*
 * Context
 */
export { TextFieldContext } from "./textfield";

/*
 * Variants
 */
export { textFieldVariants } from "@lite-app/styles/components/textfield";

export type { TextFieldVariants } from "@lite-app/styles/components/textfield";
