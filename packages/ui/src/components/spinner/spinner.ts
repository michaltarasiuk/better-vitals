import { tv, type VariantProps } from "tailwind-variants";

export const spinnerVariants = tv({
  base: "spinner",
  variants: {
    size: {
      sm: "spinner--sm",
      md: null,
      lg: "spinner--lg",
      xl: "spinner--xl",
    },
    color: {
      current: "spinner--current",
      accent: "spinner--accent",
      danger: "spinner--danger",
      success: "spinner--success",
      warning: "spinner--warning",
    },
  },
  defaultVariants: {
    size: "md",
    color: "accent",
  },
});

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;
