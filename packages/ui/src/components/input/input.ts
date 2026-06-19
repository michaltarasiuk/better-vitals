import { tv, type VariantProps } from "tailwind-variants";

export const inputVariants = tv({
  base: "input",
  variants: {
    variant: {
      primary: null,
      secondary: "input--secondary",
    },
    fullWidth: {
      true: "input--full-width",
    },
  },
  defaultVariants: {
    variant: "primary",
    fullWidth: false,
  },
});

export type InputVariants = VariantProps<typeof inputVariants>;
