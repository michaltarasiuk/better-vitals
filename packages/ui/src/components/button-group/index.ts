import type { ComponentProps } from "react";

import { ButtonGroupRoot, ButtonGroupSeparator } from "./button-group";

export const ButtonGroup = Object.assign(ButtonGroupRoot, {
  Root: ButtonGroupRoot,
  Separator: ButtonGroupSeparator,
});

export interface ButtonGroup {
  Props: ComponentProps<typeof ButtonGroupRoot>;
  RootProps: ComponentProps<typeof ButtonGroupRoot>;
  SeparatorProps: ComponentProps<typeof ButtonGroupSeparator>;
}

export { ButtonGroupRoot, ButtonGroupSeparator };

export type {
  ButtonGroupRootProps as ButtonGroupProps,
  ButtonGroupRootProps,
  ButtonGroupSeparatorProps,
} from "./button-group";

export { BUTTON_GROUP_CHILD, ButtonGroupContext } from "./button-group";

export { buttonGroupVariants } from "@lite-app/styles/components/button-group";

export type { ButtonGroupVariants } from "@lite-app/styles/components/button-group";
