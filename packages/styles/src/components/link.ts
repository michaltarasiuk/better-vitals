import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";

export const linkVariants = tv({
  slots: {
    base: "link",
    icon: "link__icon",
  },
});

type LinkRenderPropsKeys =
  | "isCurrent"
  | "isHovered"
  | "isPressed"
  | "isFocused"
  | "isFocusVisible"
  | "isDisabled";

export type LinkVariants = Omit<
  VariantProps<typeof linkVariants>,
  LinkRenderPropsKeys
>;
