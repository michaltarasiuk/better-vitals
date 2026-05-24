import type { ComponentProps } from "react";

import { InputRoot } from "./input";

export const Input = Object.assign(InputRoot, {
  Root: InputRoot,
});

export interface Input {
  Props: ComponentProps<typeof InputRoot>;
  RootProps: ComponentProps<typeof InputRoot>;
}

export { InputRoot };

export type { InputRootProps as InputProps, InputRootProps } from "./input";

export { inputVariants } from "./input.variants";

export type { InputVariants } from "./input.variants";
