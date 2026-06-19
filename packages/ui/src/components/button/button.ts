import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: "button",
  variants: {
    variant: {
      primary: "button--primary",
      secondary: "button--secondary",
      tertiary: "button--tertiary",
      outline: "button--outline",
      ghost: "button--ghost",
      danger: "button--danger",
      "danger-soft": "button--danger-soft",
    },
    size: {
      sm: "button--sm",
      md: null,
      lg: "button--lg",
    },
    fullWidth: {
      true: "button--full-width",
    },
    isIconOnly: {
      true: "button--icon-only",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    fullWidth: false,
    isIconOnly: false,
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
