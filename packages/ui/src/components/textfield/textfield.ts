import { tv, type VariantProps } from "tailwind-variants";

export const textFieldVariants = tv({
  base: "textfield",
  variants: {
    fullWidth: {
      true: "textfield--full-width",
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

export type TextFieldVariants = VariantProps<typeof textFieldVariants>;
