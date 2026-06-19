import { tv, type VariantProps } from "tailwind-variants";

export const labelVariants = tv({
  base: "label",
  variants: {
    isRequired: {
      true: "label--required",
    },
    isInvalid: {
      true: "label--invalid",
    },
    isDisabled: {
      true: "label--disabled",
    },
  },
  defaultVariants: {
    isRequired: false,
    isInvalid: false,
    isDisabled: false,
  },
});

export type LabelVariants = VariantProps<typeof labelVariants>;
