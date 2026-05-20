import type { ComponentProps } from "react";

import { LabelRoot } from "./label";

/*
 * Compound Component
 */
export const Label = Object.assign(LabelRoot, {
  Root: LabelRoot,
});

export interface Label {
  Props: ComponentProps<typeof LabelRoot>;
  RootProps: ComponentProps<typeof LabelRoot>;
}

/*
 * Named Component
 */
export { LabelRoot };

export type { LabelRootProps as LabelProps, LabelRootProps } from "./label";

/*
 * Variants
 */
export { labelVariants } from "@lite-app-vitals/styles/components/label";

export type { LabelVariants } from "@lite-app-vitals/styles/components/label";
