import type { ComponentProps } from "react";

import { BUTTON_GROUP_CHILD } from "../button-group";
import { ButtonRoot } from "./button";

/*
 * Compound Component
 */
export const Button = Object.assign(ButtonRoot, {
  Root: ButtonRoot,
});

export interface Button {
  Props: ComponentProps<typeof ButtonRoot>;
  RootProps: ComponentProps<typeof ButtonRoot>;
}

/*
 * Named Component
 */
export { ButtonRoot };

export type { ButtonRootProps as ButtonProps, ButtonRootProps } from "./button";

/*
 * Re-export BUTTON_GROUP_CHILD for type declarations
 */
export { BUTTON_GROUP_CHILD };

/*
 * Variants
 */
export { buttonVariants } from "@lite-app/styles/components/button";

export type { ButtonVariants } from "@lite-app/styles/components/button";
