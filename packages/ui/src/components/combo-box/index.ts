import type { ComponentProps } from "react";

import {
  ComboBoxInputGroup,
  ComboBoxPopover,
  ComboBoxRoot,
  ComboBoxTrigger,
} from "./combo-box";

/*
 * Compound Component
 */
export const ComboBox = Object.assign(ComboBoxRoot, {
  InputGroup: ComboBoxInputGroup,
  Popover: ComboBoxPopover,
  Root: ComboBoxRoot,
  Trigger: ComboBoxTrigger,
});

export interface ComboBox<T extends object = object> {
  Props: ComponentProps<typeof ComboBoxRoot<T>>;
  RootProps: ComponentProps<typeof ComboBoxRoot<T>>;
  InputGroupProps: ComponentProps<typeof ComboBoxInputGroup>;
  TriggerProps: ComponentProps<typeof ComboBoxTrigger>;
  PopoverProps: ComponentProps<typeof ComboBoxPopover>;
}

/*
 * Named Component
 */
export { ComboBoxInputGroup, ComboBoxPopover, ComboBoxRoot, ComboBoxTrigger };

export type {
  ComboBoxInputGroupProps,
  ComboBoxPopoverProps,
  ComboBoxRootProps as ComboBoxProps,
  ComboBoxRootProps,
  ComboBoxTriggerProps,
} from "./combo-box";

/*
 * Context
 */
export { ComboBoxContext } from "./combo-box";

/*
 * Variants
 */
export { comboBoxVariants } from "@lite-app-vitals/styles/components/combo-box";

export type { ComboBoxVariants } from "@lite-app-vitals/styles/components/combo-box";
