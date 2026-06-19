import { tv, type VariantProps } from "tailwind-variants";

export const closeButtonVariants = tv({
  base: "close-button",
  variants: {
    variant: {
      default: "close-button--default",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type CloseButtonVariants = VariantProps<typeof closeButtonVariants>;
