import type { ComponentProps } from "react";

import { LinkIcon, LinkRoot } from "./link";

/*
 * Compound Component
 */
export const Link = Object.assign(LinkRoot, {
  Icon: LinkIcon,
  Root: LinkRoot,
});

export interface Link {
  Props: ComponentProps<typeof LinkRoot>;
  RootProps: ComponentProps<typeof LinkRoot>;
  IconProps: ComponentProps<typeof LinkIcon>;
}

/*
 * Named Component
 */
export { LinkIcon, LinkRoot };

export type {
  LinkIconProps,
  LinkRootProps as LinkProps,
  LinkRootProps,
} from "./link";

/*
 * Variants
 */
export { linkVariants } from "@lite-app/styles/components/link";

export type { LinkVariants } from "@lite-app/styles/components/link";
