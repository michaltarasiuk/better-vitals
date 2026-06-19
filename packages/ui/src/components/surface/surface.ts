import { tv, type VariantProps } from "tailwind-variants";

export const surfaceVariants = tv({
  base: "surface",
  variants: {
    variant: {
      default: "surface--default",
      secondary: "surface--secondary",
      tertiary: "surface--tertiary",
      transparent: "surface--transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type SurfaceVariants = VariantProps<typeof surfaceVariants>;
