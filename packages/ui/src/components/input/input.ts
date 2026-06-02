import { tv, type VariantProps } from "tailwind-variants";

export const inputVariants = tv({
  base: "input",
  defaultVariants: {
    fullWidth: false,
    variant: "primary",
  },
  variants: {
    fullWidth: {
      true: "input--full-width",
    },
    variant: {
      primary: null,
      secondary: "input--secondary",
    },
  },
});

export type InputVariants = VariantProps<typeof inputVariants>;
