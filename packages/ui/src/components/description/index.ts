import type { ComponentProps } from "react";

import { DescriptionRoot } from "./description";

export const Description = Object.assign(DescriptionRoot, {
  Root: DescriptionRoot,
});

export interface Description {
  Props: ComponentProps<typeof DescriptionRoot>;
  RootProps: ComponentProps<typeof DescriptionRoot>;
}

export { DescriptionRoot };

export type {
  DescriptionRootProps as DescriptionProps,
  DescriptionRootProps,
} from "./description";

export { descriptionVariants } from "./description.variants";

export type { DescriptionVariants } from "./description.variants";
