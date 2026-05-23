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

export { descriptionVariants } from "@lite-app/styles/components/description";

export type { DescriptionVariants } from "@lite-app/styles/components/description";
