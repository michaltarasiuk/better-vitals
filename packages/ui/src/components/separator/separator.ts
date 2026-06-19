import { tv, type VariantProps } from "tailwind-variants";

export const separatorVariants = tv({
  base: "separator",
  variants: {
    variant: {
      default: "separator--default",
      secondary: "separator--secondary",
      tertiary: "separator--tertiary",
    },
    orientation: {
      horizontal: "separator--horizontal",
      vertical: "separator--vertical",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "horizontal",
  },
});

export type SeparatorVariants = VariantProps<typeof separatorVariants>;
