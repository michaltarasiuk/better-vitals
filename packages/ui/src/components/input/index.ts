import type { ComponentProps } from "react";

import { InputRoot } from "./input";

/*
 * Compound Component
 */
export const Input = Object.assign(InputRoot, {
  Root: InputRoot,
});

export interface Input {
  Props: ComponentProps<typeof InputRoot>;
  RootProps: ComponentProps<typeof InputRoot>;
}

/*
 * Named Component
 */
export { InputRoot };

export type { InputRootProps as InputProps, InputRootProps } from "./input";

/*
 * Variants
 */
export { inputVariants } from "@lite-app/styles/components/input";

export type { InputVariants } from "@lite-app/styles/components/input";
