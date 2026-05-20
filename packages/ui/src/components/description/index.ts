import type { ComponentProps } from "react";

import { DescriptionRoot } from "./description";

/*
 * Compound Component
 */
export const Description = Object.assign(DescriptionRoot, {
  Root: DescriptionRoot,
});

export interface Description {
  Props: ComponentProps<typeof DescriptionRoot>;
  RootProps: ComponentProps<typeof DescriptionRoot>;
}

/*
 * Named Component
 */
export { DescriptionRoot };

export type {
  DescriptionRootProps as DescriptionProps,
  DescriptionRootProps,
} from "./description";

/*
 * Variants
 */
export { descriptionVariants } from "@lite-app-vitals/styles/components/description";

export type { DescriptionVariants } from "@lite-app-vitals/styles/components/description";
