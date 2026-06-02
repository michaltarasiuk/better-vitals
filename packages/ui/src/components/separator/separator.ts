import { tv, type VariantProps } from "tailwind-variants";

export const separatorVariants = tv({
  base: "separator",
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
  },
  variants: {
    orientation: {
      horizontal: "separator--horizontal",
      vertical: "separator--vertical",
    },
    variant: {
      default: "separator--default",
      secondary: "separator--secondary",
      tertiary: "separator--tertiary",
    },
  },
});

export type SeparatorVariants = VariantProps<typeof separatorVariants>;
