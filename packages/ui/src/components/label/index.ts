import type { ComponentProps } from "react";

import { LabelRoot } from "./label";

export const Label = Object.assign(LabelRoot, {
  Root: LabelRoot,
});

export interface Label {
  Props: ComponentProps<typeof LabelRoot>;
  RootProps: ComponentProps<typeof LabelRoot>;
}

export { LabelRoot };

export type { LabelRootProps as LabelProps, LabelRootProps } from "./label";

export { labelVariants } from "@lite-app/styles/components/label";

export type { LabelVariants } from "@lite-app/styles/components/label";
