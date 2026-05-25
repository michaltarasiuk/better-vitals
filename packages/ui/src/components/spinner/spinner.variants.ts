import { tv, type VariantProps } from "tailwind-variants";

export const spinnerVariants = tv({
  base: "spinner",
  defaultVariants: {
    color: "accent",
    size: "md",
  },
  variants: {
    color: {
      accent: "spinner--accent",
      current: "spinner--current",
      danger: "spinner--danger",
      success: "spinner--success",
      warning: "spinner--warning",
    },
    size: {
      lg: "spinner--lg",
      md: null,
      sm: "spinner--sm",
      xl: "spinner--xl",
    },
  },
});

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;
