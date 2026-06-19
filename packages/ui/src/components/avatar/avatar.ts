import { tv, type VariantProps } from "tailwind-variants";

export const avatarVariants = tv({
  slots: {
    base: "avatar",
    image: "avatar__image",
    fallback: "avatar__fallback",
  },
  variants: {
    variant: {
      default: {},
      soft: {
        base: "avatar--soft",
      },
    },
    size: {
      sm: {
        base: "avatar--sm",
      },
      md: {
        base: null,
      },
      lg: {
        base: "avatar--lg",
      },
    },
    color: {
      default: {
        fallback: "avatar__fallback--default",
      },
      accent: {
        fallback: "avatar__fallback--accent",
      },
      danger: {
        fallback: "avatar__fallback--danger",
      },
      success: {
        fallback: "avatar__fallback--success",
      },
      warning: {
        fallback: "avatar__fallback--warning",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    color: "default",
  },
});

export type AvatarVariants = VariantProps<typeof avatarVariants>;
