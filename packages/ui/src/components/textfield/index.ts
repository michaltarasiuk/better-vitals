import type { ComponentProps } from "react";

import { TextFieldRoot } from "./textfield";

export const TextField = Object.assign(TextFieldRoot, {
  Root: TextFieldRoot,
});

export interface TextField {
  Props: ComponentProps<typeof TextFieldRoot>;
  RootProps: ComponentProps<typeof TextFieldRoot>;
}

export { TextFieldRoot };

export type {
  TextFieldRootProps as TextFieldProps,
  TextFieldRootProps,
} from "./textfield";

export { TextFieldContext } from "./textfield";

export { textFieldVariants } from "./textfield.variants";

export type { TextFieldVariants } from "./textfield.variants";
